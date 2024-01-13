use aos_statshammer::{
    abilities as ab, Characteristic as C, ModelGroup, Phase as P, Unit, Weapon, D6,
};
use assert_float_eq::*;

macro_rules! assert_average {
    ($unit: expr, $save:expr => $exp:expr) => {
        assert_float_absolute_eq!($unit.average_damage(&$save.into()), $exp, 0.0005);
    };
    ($unit: expr, $save:expr => $exp:expr, $($saves:expr => $exps:expr),+) => {
        assert_average!($unit, $save => $exp);
        assert_average!($unit, $($saves => $exps),+);
    };
}

mod units {
    use super::*;

    pub fn chainrasp_horde() -> Unit {
        let weapon = Weapon::new(2, 4, 4, 0, 1);
        Unit::new("Chainrasp Horde".to_string()).add_model_group(
            ModelGroup::new(10, weapon).with_leader(1, ab::Bonus::new(C::Attacks, 1)),
        )
    }

    pub fn mortek_guard_swords() -> Unit {
        let weapon =
            Weapon::new(2, 3, 4, 1, 1).with_ability(ab::Exploding::new(P::Hit, 6, 1, true));
        let greatblade = Weapon::new(2, 3, 3, 1, 1);
        Unit::new("Mortek Guard".to_string())
            .add_model_group(
                ModelGroup::new(9, weapon).with_leader(1, ab::Bonus::new(C::Attacks, 1)),
            )
            .add_model_group(ModelGroup::new(1, greatblade))
    }

    pub fn heathguard_berzerkers_broadaxes() -> Unit {
        let weapon = Weapon::new(2, 3, 3, 1, 2);
        Unit::new("Hearthguard Berzerkers".to_string()).add_model_group(
            ModelGroup::new(20, weapon).with_leader(1, ab::Bonus::new(C::Attacks, 1)),
        )
    }

    pub fn necropolis_stalkers() -> Unit {
        let dread_falchions = Weapon::new(3, 3, 4, 2, 2);
        let spirit_blades = Weapon::new(5, 3, 3, 1, 1);
        Unit::new("Necropolis Stalkers".to_string())
            .add_model_group(ModelGroup::new(1, dread_falchions))
            .add_model_group(ModelGroup::new(2, spirit_blades))
    }

    pub fn necropolis_stalkers_precision_aspect() -> Unit {
        let abilities: [ab::Ability; 2] = [
            ab::Bonus::new(C::Rend, 1).into(),
            ab::Bonus::new(C::Damage, 1).into(),
        ];
        let dread_falchions = Weapon::new(3, 3, 4, 2, 2).with_abilities(abilities.clone());
        let spirit_blades = Weapon::new(5, 3, 3, 1, 1).with_abilities(abilities.clone());
        Unit::new("Necropolis Stalkers".to_string())
            .add_model_group(ModelGroup::new(1, dread_falchions))
            .add_model_group(ModelGroup::new(2, spirit_blades))
    }

    pub fn gotrek() -> Unit {
        let weapon = Weapon::new(6, 3, 3, 2, 3).with_abilities([
            ab::Reroll::new(P::Hit, ab::RerollType::Any).into(),
            ab::Reroll::new(P::Wound, ab::RerollType::Any).into(),
            ab::MortalWounds::new(P::Hit, 6, D6, true, true).into(), // Replace with D6
        ]);
        Unit::new("Gotrek Gurnisson".to_string()).add_model_group(ModelGroup::new(1, weapon))
    }
}

mod test_average {
    use super::*;

    #[test]
    fn test_chainrasp_horde() {
        assert_average! {
            units::chainrasp_horde(),
            2 => 0.875,
            3 => 1.75,
            4 => 2.625,
            5 => 3.5,
            6 => 4.375,
            7 => 5.25
        }
    }

    #[test]
    fn test_mortek_swords() {
        assert_average! {
            units::mortek_guard_swords(),
            2 => 2.935,
            3 => 4.403,
            4 => 5.87,
            5 => 7.338,
            6 => 8.806,
            7 => 8.806
        }
    }

    #[test]
    fn test_heathguard_berzerkers_broadaxes() {
        assert_average! {
            units::heathguard_berzerkers_broadaxes(),
            2 => 12.148,
            3 => 18.222,
            4 => 24.296,
            5 => 30.37,
            6 => 36.444,
            7 => 36.444
        }
    }

    #[test]
    fn test_necropolis_stalkers() {
        assert_average! {
            units::necropolis_stalkers(),
            2 => 2.481,
            3 => 3.556,
            4 => 4.63,
            5 => 5.704,
            6 => 6.444,
            7 => 6.444
        }
    }

    #[test]
    fn test_necropolis_stalkers_precision_aspect() {
        assert_average! {
            units::necropolis_stalkers_precision_aspect(),
            2 => 6.444,
            3 => 8.426,
            4 => 10.407,
            5 => 11.889,
            6 => 11.889,
            7 => 11.889
        }
    }

    #[test]
    fn test_gotrek() {
        assert_average! {
            units::gotrek(),
            2 => 11.778,
            3 => 14.148,
            4 => 16.519,
            5 => 18.889,
            6 => 18.889,
            7 => 18.889
        }
    }
}
