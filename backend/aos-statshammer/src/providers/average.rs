use crate::abilities as ab;
use crate::{Characteristic, Phase, Target, Weapon, D6};

pub struct AverageProvider<'a> {
    weapon: &'a Weapon,
    target: &'a Target,
}

impl<'a> AverageProvider<'a> {
    pub fn new(weapon: &'a Weapon, target: &'a Target) -> Self {
        Self { weapon, target }
    }

    pub fn average_damage(&self) -> f64 {
        let mut damage = 0.0;
        let attacks =
            self.weapon.attacks.average() + self.average_weapon_bonus_for(Characteristic::Attacks);

        let hits_result = self.average_rolls_for_phase(Phase::Hit, attacks);
        damage += hits_result.1;

        let wounds_result = self.average_rolls_for_phase(Phase::Wound, hits_result.0);
        damage += wounds_result.1;

        let damage_per_wound =
            self.weapon.damage.average() + self.average_weapon_bonus_for(Characteristic::Damage);
        damage += self.average_unsaved_wounds(wounds_result.0) * damage_per_wound;

        match self.target.ward {
            Some(w) => damage * D6.inverse_probability(w),
            _ => damage,
        }
    }

    fn average_rolls_for_phase(&self, phase: Phase, base: f64) -> (f64, f64) {
        let mut base = base;
        let characteristic = match phase {
            Phase::Hit => self.weapon.to_hit,
            Phase::Wound => self.weapon.to_wound,
        } as f64;
        let modifier = self.average_weapon_bonus_for(phase.into());

        if let Some(reroll_type) = self.weapon.abilities().reroll_for_phase(phase) {
            base += Self::average_rerolls(reroll_type, base, characteristic, modifier)
        }
        let mut result = base * D6.probability(characteristic - modifier);
        result += self
            .weapon
            .abilities()
            .resolve_exploding(phase, |a| Self::average_exploding(a, base, modifier));
        let (mortal_wounds, reduction) = self
            .weapon
            .abilities()
            .resolve_mortal_wounds(phase, |a| Self::average_mortal_wounds(a, base, modifier));
        result -= reduction;
        (result, mortal_wounds)
    }

    fn average_unsaved_wounds(&self, wounds: f64) -> f64 {
        let roll_target = self.target.save as f64;
        let modifier = match self.target.ethereal {
            true => 0.0,
            false => self.weapon.rend as f64 + self.average_weapon_bonus_for(Characteristic::Rend),
        };
        let wounds = match self.target.rerolls {
            Some(reroll_type) => {
                wounds - Self::average_rerolls(reroll_type, wounds, roll_target, modifier)
            }
            _ => wounds,
        };
        wounds * D6.inverse_probability(roll_target + modifier)
    }

    fn average_rerolls(reroll_type: ab::RerollType, base: f64, target: f64, modifier: f64) -> f64 {
        base * match reroll_type {
            ab::RerollType::Ones => 1.0 / 6.0,
            ab::RerollType::Failed => D6.inverse_probability(target.min(target + modifier)),
            ab::RerollType::Any => D6.inverse_probability(target),
        }
    }

    fn average_exploding(ability: &ab::Exploding, base: f64, modifier: f64) -> f64 {
        let roll_target = match ability.unmodified {
            true => ability.target as f64,
            false => ability.target as f64 - modifier,
        };
        let probability = D6.probability(roll_target);
        base * probability * ability.additional.average()
    }

    fn average_mortal_wounds(ability: &ab::MortalWounds, base: f64, modifier: f64) -> (f64, f64) {
        let roll_target = match ability.unmodified {
            true => ability.target as f64,
            false => ability.target as f64 - modifier,
        };
        let num_mortals = base * D6.probability(roll_target);
        let damage = num_mortals * ability.mortals.average();
        if ability.in_addition {
            return (damage, 0.0);
        }
        (damage, num_mortals)
    }

    fn average_weapon_bonus_for(&self, characteristic: Characteristic) -> f64 {
        self.weapon
            .abilities()
            .bonus_for_characteristic(characteristic)
            .average()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::DiceNotation as DN;
    use assert_float_eq::*;
    use test_case::test_case;

    #[test]
    fn test_bonus_to_roll_is_equivalent_to_better_characteristic() {
        let weapon_1 = Weapon::new(2, 4, 4, 1, 1).with_abilities([
            ab::Bonus::new(Characteristic::Attacks, 1).into(),
            ab::Bonus::new(Characteristic::ToHit, 1).into(),
            ab::Bonus::new(Characteristic::ToWound, 1).into(),
            ab::Bonus::new(Characteristic::Rend, 1).into(),
            ab::Bonus::new(Characteristic::Damage, 1).into(),
        ]);
        let weapon_2 = Weapon::new(3, 3, 3, 2, 2);
        let target = Target::new(4);
        assert_float_absolute_eq!(
            AverageProvider::new(&weapon_1, &target).average_damage(),
            AverageProvider::new(&weapon_2, &target).average_damage()
        );
    }

    mod test_average_unsaved_wounds {
        use super::*;
        use test_case::test_case;

        #[test]
        fn test_no_rend() {
            let weapon = Weapon::new(2, 4, 4, 0, 1);
            let target = Target::new(4);
            let provider = AverageProvider::new(&weapon, &target);
            assert_float_absolute_eq!(provider.average_unsaved_wounds(4.0), 2.0, 0.0005);
        }

        #[test]
        fn test_with_rend() {
            let weapon = Weapon::new(2, 4, 4, 1, 1);
            let target = Target::new(4);
            let provider = AverageProvider::new(&weapon, &target);
            assert_float_absolute_eq!(provider.average_unsaved_wounds(4.0), 2.667, 0.0005);
        }

        #[test]
        fn test_with_rend_and_bonus() {
            let weapon =
                Weapon::new(2, 4, 4, 1, 1).with_ability(ab::Bonus::new(Characteristic::Rend, 1));
            let target = Target::new(4);
            let provider = AverageProvider::new(&weapon, &target);
            assert_float_absolute_eq!(provider.average_unsaved_wounds(4.0), 3.333, 0.0005);
        }

        #[test]
        fn test_ethereal_ignores_rend_and_bonus() {
            let weapon =
                Weapon::new(2, 4, 4, 1, 1).with_ability(ab::Bonus::new(Characteristic::Rend, 1));
            let target = Target::new(4).with_ethereal();
            let provider = AverageProvider::new(&weapon, &target);
            assert_float_absolute_eq!(provider.average_unsaved_wounds(4.0), 2.0, 0.0005);
        }

        #[test_case(ab::RerollType::Ones, 1.667 ; "ones")]
        #[test_case(ab::RerollType::Failed, 1.0 ; "failed")]  // TODO: Check this with rend
        #[test_case(ab::RerollType::Any, 1.0 ; "any")]
        fn test_rerolls(reroll_type: ab::RerollType, expected: f64) {
            let weapon = Weapon::new(2, 4, 4, 0, 1);
            let target = Target::new(4).with_rerolls(reroll_type);
            let provider = AverageProvider::new(&weapon, &target);
            assert_float_absolute_eq!(provider.average_unsaved_wounds(4.0), expected, 0.0005);
        }
    }

    #[test_case(ab::RerollType::Ones, 0.667 ; "ones")]
    #[test_case(ab::RerollType::Failed, 1.333 ; "failed")]
    #[test_case(ab::RerollType::Any, 1.333 ; "any")]
    fn test_average_rerolls(reroll_type: ab::RerollType, expected: f64) {
        assert_float_absolute_eq!(
            AverageProvider::average_rerolls(reroll_type, 4.0, 3.0, 1.0),
            expected,
            0.0005
        )
    }

    #[test_case(true, 0.667 ; "unmodified")]
    #[test_case(false, 1.333 ; "modified")]
    fn test_average_exploding(unmodified: bool, expected: f64) {
        assert_float_absolute_eq!(
            AverageProvider::average_exploding(
                &ab::Exploding::new(Phase::Hit, 6, 2, unmodified),
                2.0,
                1.0
            ),
            expected,
            0.0005
        );
    }

    #[test_case(true, true, 0.667, 0.0 ; "unmodified and in addition")]
    #[test_case(false, true, 1.333, 0.0 ; "modified and in addition")]
    #[test_case(true, false, 0.667, 0.333 ; "unmodified")]
    #[test_case(false, false, 1.333, 0.667 ; "modified")]
    fn test_average_mortal_wounds(
        unmodified: bool,
        in_addition: bool,
        expected_mortals: f64,
        expected_reduction: f64,
    ) {
        let (mortal_wounds, reduction) = AverageProvider::average_mortal_wounds(
            &ab::MortalWounds::new(Phase::Hit, 6, 2, unmodified, in_addition),
            2.0,
            1.0,
        );
        assert_float_absolute_eq!(mortal_wounds, expected_mortals, 0.0005);
        assert_float_absolute_eq!(reduction, expected_reduction, 0.0005);
    }

    #[test_case(DN::from(D6), 1.167 ; "D6")]
    #[test_case(D6 + 1, 1.5 ; "D6 + 1")]
    fn test_average_mortal_wounds_dice_value(mortals: DN, expected_mortals: f64) {
        let (mortal_wounds, reduction) = AverageProvider::average_mortal_wounds(
            &ab::MortalWounds::new(Phase::Hit, 6, mortals, true, true),
            2.0,
            1.0,
        );
        assert_float_absolute_eq!(mortal_wounds, expected_mortals, 0.0005);
        assert_float_absolute_eq!(reduction, 0.0, 0.0005);
    }
}
