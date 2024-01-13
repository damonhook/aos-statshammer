use crate::{abilities as ab, Characteristic, Phase, Roller, Target, Weapon, D6};

pub struct SimulationProvider<'a> {
    weapon: &'a Weapon,
    target: &'a Target,
    roller: &'a dyn Roller,
}

impl<'a> SimulationProvider<'a> {
    pub fn new(weapon: &'a Weapon, target: &'a Target) -> Self {
        Self {
            weapon,
            target,
            roller: &D6,
        }
    }

    #[allow(dead_code)]
    fn using_roller<T>(mut self, roller: &'a T) -> Self
    where
        T: Roller + 'static,
    {
        self.roller = roller;
        self
    }

    pub fn simulate_weapon(&self) -> u8 {
        let mut total_damage: u8 = 0;
        let total_attacks =
            self.weapon.attacks.roll() + self.roll_weapon_bonus_for(Characteristic::Attacks);
        for _ in 0..total_attacks {
            let hit_result = self.simulate_roll_phase(Phase::Hit);
            total_damage += hit_result.1;
            for _ in 0..hit_result.0 {
                let wound_result = self.simulate_roll_phase(Phase::Wound);
                total_damage += wound_result.1;
                for _ in 0..wound_result.0 {
                    if !self.roll_saved() {
                        total_damage += self.weapon.damage.roll()
                            + self.roll_weapon_bonus_for(Characteristic::Damage)
                    }
                }
            }
        }
        self.roll_wards(total_damage)
    }

    fn simulate_roll_phase(&self, phase: Phase) -> (u8, u8) {
        let characteristic = match phase {
            Phase::Hit => self.weapon.to_hit,
            Phase::Wound => self.weapon.to_wound,
        };
        let modifier = self.roll_weapon_bonus_for(phase.into());
        let roll = self.roll_with_reroll(
            self.weapon.abilities().reroll_for_phase(phase),
            characteristic,
            modifier,
        );
        let mut hits = (roll + modifier >= characteristic) as u8;

        hits += self
            .weapon
            .abilities()
            .resolve_exploding(phase, |a| Self::roll_exploding(a, roll, modifier));

        let (mortal_wounds, hits_reduction) = self
            .weapon
            .abilities()
            .resolve_mortal_wounds(phase, |a| Self::roll_mortal_wounds(a, roll, modifier));
        hits -= hits_reduction;

        return (hits, mortal_wounds);
    }

    fn roll_with_reroll(
        &self,
        reroll_type: Option<ab::RerollType>,
        target: u8,
        modifier: u8,
    ) -> u8 {
        let roll = self.roller.roll();
        if roll + modifier >= target {
            return roll;
        }
        let can_reroll = match reroll_type {
            Some(ab::RerollType::Ones) => roll == 1,
            Some(ab::RerollType::Failed) => roll <= target.min(target + modifier),
            Some(ab::RerollType::Any) => roll <= target,
            None => false,
        };
        match can_reroll {
            true => self.roller.roll(),
            false => roll,
        }
    }

    fn roll_saved(&self) -> bool {
        let modifier = match self.target.ethereal {
            true => 0,
            false => self.weapon.rend + self.roll_weapon_bonus_for(Characteristic::Rend),
        };
        let save_roll = self.roll_with_reroll(self.target.rerolls, self.target.save, modifier);
        save_roll >= (self.target.save + modifier)
    }

    fn roll_wards(&self, damage: u8) -> u8 {
        match self.target.ward {
            Some(ward) => (0..damage).fold(0, |acc, _| {
                if self.roller.roll() >= ward {
                    acc
                } else {
                    acc + 1
                }
            }),
            None => damage,
        }
    }

    fn roll_exploding(ability: &ab::Exploding, roll: u8, modifier: u8) -> u8 {
        let roll = match ability.unmodified {
            true => roll,
            false => roll + modifier,
        };
        if roll >= ability.target {
            return ability.additional.roll();
        }
        return 0;
    }

    fn roll_mortal_wounds(ability: &ab::MortalWounds, roll: u8, modifier: u8) -> (u8, u8) {
        let roll = match ability.unmodified {
            true => roll,
            false => roll + modifier,
        };
        if roll >= ability.target {
            let reduction: u8 = if ability.in_addition { 0 } else { 1 };
            return (ability.mortals.roll(), reduction);
        }
        return (0, 0);
    }

    fn roll_weapon_bonus_for(&self, characteristic: Characteristic) -> u8 {
        self.weapon
            .abilities()
            .bonus_for_characteristic(characteristic)
            .roll()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::MockRoller;
    use test_case::test_case;

    macro_rules! mock_roll_group {
        ($roller: ident, $results: expr) => {
            $results.iter().for_each(|r| {
                $roller.expect_roll().times(1).return_const(*r);
            })
        };
    }

    #[test]
    fn test_no_hit() {
        let weapon = Weapon::new(1, 4, 4, 1, 1);
        let target = Target::new(4);
        let mut mock_roller = MockRoller::default();
        // hit(3) -> fail
        mock_roll_group!(mock_roller, [3]);
        let provider = SimulationProvider::new(&weapon, &target).using_roller(&mock_roller);
        assert_eq!(provider.simulate_weapon(), 0);
    }

    #[test]
    fn test_no_wound() {
        let weapon = Weapon::new(1, 4, 4, 1, 1);
        let target = Target::new(4);
        let mut mock_roller = MockRoller::default();
        // hit(4) -> wound(3) -> fail
        mock_roll_group!(mock_roller, [4, 3]);
        let provider = SimulationProvider::new(&weapon, &target).using_roller(&mock_roller);
        assert_eq!(provider.simulate_weapon(), 0);
    }

    #[test]
    fn test_target_saved_wound() {
        let weapon = Weapon::new(1, 4, 4, 1, 1);
        let target = Target::new(4);
        let mut mock_roller = MockRoller::default();
        // hit(4) -> wound(4) -> save(5) -> fail
        mock_roll_group!(mock_roller, [4, 4, 5]);
        let provider = SimulationProvider::new(&weapon, &target).using_roller(&mock_roller);
        assert_eq!(provider.simulate_weapon(), 0);
    }

    #[test]
    fn test_successfully_does_damage() {
        let weapon = Weapon::new(1, 4, 4, 1, 1);
        let target = Target::new(4);
        let mut mock_roller = MockRoller::default();
        // hit(4) -> wound(4) -> save(4) -> success
        mock_roll_group!(mock_roller, [4, 4, 4]);
        let provider = SimulationProvider::new(&weapon, &target).using_roller(&mock_roller);
        assert_eq!(provider.simulate_weapon(), 1);
    }

    #[test]
    fn test_does_damage_with_multiple_attacks() {
        let weapon = Weapon::new(3, 4, 4, 1, 1);
        let target = Target::new(4);
        let mut mock_roller = MockRoller::default();
        // Attack 1: hit(4) -> wound(4) -> save(4) -> success
        mock_roll_group!(mock_roller, [4, 4, 4]);
        // Attack 2: hit(4) -> wound(4) -> save(4) -> success
        mock_roll_group!(mock_roller, [4, 4, 4]);
        // Attack 2: hit(4) -> wound(2) -> fail
        mock_roll_group!(mock_roller, [4, 2]);
        let provider = SimulationProvider::new(&weapon, &target).using_roller(&mock_roller);
        assert_eq!(provider.simulate_weapon(), 2);
    }

    #[test]
    fn test_bonus_characteristics() {
        let weapon = Weapon::new(1, 4, 4, 1, 1).with_abilities([
            ab::Bonus::new(Characteristic::Attacks, 1).into(),
            ab::Bonus::new(Characteristic::ToHit, 1).into(),
            ab::Bonus::new(Characteristic::ToWound, 1).into(),
            ab::Bonus::new(Characteristic::Rend, 1).into(),
            ab::Bonus::new(Characteristic::Damage, 1).into(),
        ]);
        let target = Target::new(4);
        let mut mock_roller = MockRoller::default();
        // Attack 1: hit(3) -> wound(3) -> save(4) -> success
        mock_roll_group!(mock_roller, [3, 3, 4]);
        // Attack 2: hit(4) -> wound(4) -> save(5) -> success
        mock_roll_group!(mock_roller, [4, 4, 5]);
        let provider = SimulationProvider::new(&weapon, &target).using_roller(&mock_roller);
        assert_eq!(provider.simulate_weapon(), 4);
    }

    mod test_roll_with_rerolls {
        use super::*;

        #[test]
        fn test_roll_with_reroll_given_no_reroll_modifier() {
            let weapon = Weapon::new(2, 3, 4, 1, 1);
            let target = Target::new(4);
            let mut mock_roller = MockRoller::default();
            mock_roller.expect_roll().times(1).return_const(3u8);
            let provider = SimulationProvider::new(&weapon, &target).using_roller(&mock_roller);

            assert_eq!(provider.roll_with_reroll(None, 4, 0), 3);
        }

        #[test]
        fn test_roll_with_reroll_given_reroll_any() {
            let mut mock_roller = MockRoller::default();
            let weapon = Weapon::new(2, 3, 4, 1, 1);
            let target = Target::new(4);
            mock_roller.expect_roll().times(1).return_const(3u8); // First roll is a 3
            mock_roller.expect_roll().times(1).return_const(6u8); // Second roll is a 6
            let provider = SimulationProvider::new(&weapon, &target).using_roller(&mock_roller);
            assert_eq!(
                provider.roll_with_reroll(Some(ab::RerollType::Any), 4, 0),
                6
            );
        }

        #[test]
        fn test_roll_with_reroll_given_roll_higher_meets_target() {
            let weapon = Weapon::new(2, 3, 4, 1, 1);
            let target = Target::new(4);
            let mut mock_roller = MockRoller::default();
            mock_roller.expect_roll().times(1).return_const(3u8);
            let provider = SimulationProvider::new(&weapon, &target).using_roller(&mock_roller);
            assert_eq!(
                provider.roll_with_reroll(Some(ab::RerollType::Any), 4, 1),
                3
            );
        }

        #[test]
        fn test_roll_with_reroll_given_reroll_ones_when_roll_not_one() {
            let weapon = Weapon::new(2, 3, 4, 1, 1);
            let target = Target::new(4);
            let mut mock_roller = MockRoller::default();
            mock_roller.expect_roll().times(1).return_const(2u8);
            let provider = SimulationProvider::new(&weapon, &target).using_roller(&mock_roller);
            assert_eq!(
                provider.roll_with_reroll(Some(ab::RerollType::Ones), 4, 0),
                2
            );
        }

        #[test]
        fn test_roll_with_reroll_given_reroll_ones_when_roll_is_one() {
            let mut mock_roller = MockRoller::default();
            let weapon = Weapon::new(2, 3, 4, 1, 1);
            let target = Target::new(4);
            mock_roller.expect_roll().times(1).return_const(1u8);
            mock_roller.expect_roll().times(1).return_const(6u8);
            let provider = SimulationProvider::new(&weapon, &target).using_roller(&mock_roller);
            assert_eq!(
                provider.roll_with_reroll(Some(ab::RerollType::Ones), 4, 0),
                6
            );
        }
    }

    #[test_case(true, 5, 1, 0 ; "unmodified less than target")]
    #[test_case(true, 6, 0, 2 ; "unmodified meets target")]
    #[test_case(false, 5, 1, 2 ; "modified meets target")]
    #[test_case(false, 4, 1, 0 ; "modified less than target")]
    fn test_roll_exploding(unmodified: bool, roll: u8, modifier: u8, expected: u8) {
        let ability = ab::Exploding::new(Phase::Hit, 6, 2, unmodified);
        assert_eq!(
            SimulationProvider::roll_exploding(&ability, roll, modifier),
            expected
        );
    }

    #[test_case(true, true, 5, 1, (0, 0) ; "unmodified less than target")]
    #[test_case(true, false, 6, 0, (2, 1) ; "unmodified meets target")]
    #[test_case(true, true, 6, 0, (2, 0) ; "unmodified and in_addition meets target")]
    #[test_case(false, true, 4, 1, (0, 0) ; "modified less than target")]
    #[test_case(false, false, 5, 1, (2, 1) ; "modified meets target")]
    #[test_case(false, true, 5, 1, (2, 0) ; "modified and in_addition meets target")]
    fn test_roll_mortal_wounds(
        unmodified: bool,
        in_addition: bool,
        roll: u8,
        modifier: u8,
        expected: (u8, u8),
    ) {
        let ability = ab::MortalWounds::new(Phase::Hit, 6, 2, unmodified, in_addition);
        assert_eq!(
            SimulationProvider::roll_mortal_wounds(&ability, roll, modifier),
            expected
        );
    }
}
