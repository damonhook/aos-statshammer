use super::{Ability, Exploding, MortalWounds, RerollType};
use crate::{Characteristic, DiceNotation, Phase};
use derive_new::new;
use num_traits::{clamp_max, zero, Num};
use std::ops::{Index, IndexMut};

macro_rules! enum_map {
    (struct $name: ident => [$enum:ident; $length:expr]) => {
        #[derive(Debug, Default, new, Clone, PartialEq, Eq)]
        struct $name<T: Clone + Default>([T; $length]);
        impl<T: Clone + Default> Index<$enum> for $name<T> {
            type Output = T;

            fn index(&self, index: $enum) -> &Self::Output {
                &self.0[index as usize]
            }
        }
        impl<T: Clone + Default> IndexMut<$enum> for $name<T> {
            fn index_mut(&mut self, index: $enum) -> &mut Self::Output {
                &mut self.0[index as usize]
            }
        }
        impl<T: Clone> $name<Vec<T>> {
            #[allow(dead_code)]
            fn push(&mut self, key: $enum, ability: &T) {
                self[key].push(ability.clone());
            }

            #[allow(dead_code)]
            fn resolve<B, F>(&self, key: $enum, init: B, f: F) -> B
            where
                F: FnMut(B, &T) -> B,
            {
                self[key].iter().fold(init, f)
            }
        }
    };
}

// TODO: Replace with the enum-map crate
enum_map!(struct PhaseMap => [Phase; 2]);
enum_map!(struct CharacteristicMap => [Characteristic; 5]);

/// A facade around the abilities that a [`Weapon`](crate::Weapon) has.
///
/// <div class="warning">
///
/// You should **not** create instances of this facade manually, rather use the methods
/// provided by the [`Weapon`](crate::Weapon) struct for adding abilities.
///
/// </div>
#[derive(Debug, Default, Clone, PartialEq, Eq)]
pub struct AbilityFacade {
    // rerolls: [Option<RerollType>; 2],
    rerolls: PhaseMap<Option<RerollType>>,
    bonus: CharacteristicMap<DiceNotation>,
    exploding: PhaseMap<Vec<Exploding>>,
    mortal_wounds: PhaseMap<Vec<MortalWounds>>,
}

impl AbilityFacade {
    pub fn add_ability(&mut self, ability: &Ability) {
        match ability {
            Ability::Reroll(a) => {
                if Some(a.reroll_type) > self.rerolls[a.phase] {
                    self.rerolls[a.phase] = Some(a.reroll_type);
                }
            }
            Ability::Bonus(a) => {
                self.bonus[a.characteristic] += a.value.clone();
            }
            Ability::Exploding(a) => {
                self.exploding.push(a.phase, a);
            }
            Ability::MortalWounds(a) => {
                self.mortal_wounds.push(a.phase, a);
            }
        }
    }

    pub fn reroll_for_phase(&self, phase: Phase) -> Option<RerollType> {
        self.rerolls[phase]
    }

    pub fn bonus_for_characteristic(&self, characteristic: Characteristic) -> DiceNotation {
        self.bonus[characteristic].clone()
    }

    pub fn resolve_exploding<T, F>(&self, phase: Phase, f: F) -> T
    where
        T: Num,
        F: Fn(&Exploding) -> T,
    {
        self.exploding.resolve(phase, zero(), |acc, a| acc + f(a))
    }

    pub fn resolve_mortal_wounds<T, F>(&self, phase: Phase, f: F) -> (T, T)
    where
        T: Num + PartialOrd,
        F: Fn(&MortalWounds) -> (T, T),
    {
        self.mortal_wounds
            .resolve(phase, (zero(), zero()), |acc, a| {
                let (damage, reduction) = f(a);
                (acc.0 + damage, clamp_max(acc.1, reduction))
            })
    }
}

impl From<&[Ability]> for AbilityFacade {
    fn from(value: &[Ability]) -> Self {
        let mut facade = Self::default();
        for ability in value {
            facade.add_ability(ability);
        }
        return facade;
    }
}

#[cfg(test)]
mod tests {
    use super::super::{Bonus, Reroll};
    use super::*;
    use crate::{D3, D6};

    #[test]
    fn test_from_abilities_empty() {
        let output = AbilityFacade::from(&[] as &[Ability]);
        let expected = AbilityFacade::default();
        assert_eq!(output, expected);
    }

    #[test]
    fn test_from_abilities_bonuses() {
        let output = AbilityFacade::from(&[
            Bonus::new(Characteristic::Attacks, 1).into(),
            Bonus::new(Characteristic::ToHit, 2).into(),
            Bonus::new(Characteristic::ToWound, 3).into(),
            Bonus::new(Characteristic::Rend, 4).into(),
            Bonus::new(Characteristic::Damage, D6).into(),
        ] as &[Ability]);
        let expected = AbilityFacade {
            rerolls: PhaseMap::default(),
            bonus: CharacteristicMap::new([
                DiceNotation::from(1),
                DiceNotation::from(2),
                DiceNotation::from(3),
                DiceNotation::from(4),
                DiceNotation::from(D6),
            ]),
            exploding: PhaseMap::default(),
            mortal_wounds: PhaseMap::default(),
        };
        assert_eq!(output, expected);
    }

    #[test]
    fn test_from_abilities_mixed() {
        let output = AbilityFacade::from(&[
            Reroll::new(Phase::Hit, RerollType::Any).into(),
            Bonus::new(Characteristic::Attacks, 1).into(),
            Exploding::new(Phase::Hit, 6, 1, true).into(),
            MortalWounds::new(Phase::Wound, 6, D3, true, false).into(),
        ] as &[Ability]);
        let expected = AbilityFacade {
            rerolls: PhaseMap::new([Some(RerollType::Any), None]),
            bonus: CharacteristicMap::new([
                DiceNotation::from(1),
                DiceNotation::from(0),
                DiceNotation::from(0),
                DiceNotation::from(0),
                DiceNotation::from(0),
            ]),
            exploding: PhaseMap::new([vec![Exploding::new(Phase::Hit, 6, 1, true)], vec![]]),
            mortal_wounds: PhaseMap::new([
                vec![],
                vec![MortalWounds::new(Phase::Wound, 6, D3, true, false)],
            ]),
        };
        assert_eq!(output, expected);
    }
}
