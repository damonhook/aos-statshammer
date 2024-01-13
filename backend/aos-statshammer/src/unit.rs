use crate::abilities::{Ability, AbilityFacade, Bonus};
use crate::providers::{AverageProvider, SimulationProvider};
use crate::{DiceNotation, Target};
use num_traits::{zero, Num};


/// Represents a single weapon profile with its characteristics and abilities.
#[derive(Debug, Clone)]
pub struct Weapon {
    pub attacks: DiceNotation,
    pub to_hit: u8,
    pub to_wound: u8,
    pub rend: u8,
    pub damage: DiceNotation,
    abilities: AbilityFacade,
}

impl Weapon {
    /// Constructs a new `Weapon`
    ///
    /// # Examples
    ///
    /// Create a basic `Weapon` with the following characteristics
    ///
    /// | Attacks | To Hit | To Wound | Rend | Damage |
    /// | ------- | ------ | -------- | ---- | ------ |
    /// | 2       | 3+     | 4+       | -1   | 1      |
    ///
    /// ```
    /// # use aos_statshammer::Weapon;
    /// let weapon = Weapon::new(2, 3, 4, 1, 1);
    /// ```
    ///
    /// You can also pass [`Dice`](crate::Dice) or full [`DiceNotation`] values to the `attacks`
    /// and/or `damage` characteristics
    ///
    /// ```
    /// # use aos_statshammer::{Weapon, D3, D6};
    /// let weapon = Weapon::new(D3, 3, 4, 1, D6 + 2);
    /// ```
    pub fn new<A, D>(attacks: A, to_hit: u8, to_wound: u8, rend: u8, damage: D) -> Self
    where
        A: Into<DiceNotation>,
        D: Into<DiceNotation>,
    {
        Self {
            attacks: attacks.into(),
            to_hit,
            to_wound,
            rend,
            damage: damage.into(),
            abilities: AbilityFacade::default(),
        }
    }

    /// Add a single [`Ability`] variant to the `Weapon`
    ///
    /// # Example
    ///
    /// ```
    /// # use aos_statshammer::{Phase, Weapon};
    /// # use aos_statshammer::abilities::{Reroll, RerollType};
    /// let weapon = Weapon::new(2, 3, 4, 1, 1).with_ability(
    ///     Reroll::new(Phase::Hit, RerollType::Ones)
    /// );
    /// ```
    pub fn with_ability<A>(mut self, ability: A) -> Self
    where
        A: Into<Ability>,
    {
        self.abilities.add_ability(&ability.into());
        self
    }

    /// Add multiple [`Abilities`](`Ability`) to the `Weapon`. You have to pass the [`Ability`] enum
    /// and not just a variant (you can also use `.into()`)
    ///
    /// # Example
    ///
    /// ```
    /// # use aos_statshammer::{Characteristic, Phase, Weapon};
    /// # use aos_statshammer::abilities::{Bonus, Reroll, RerollType};
    /// let weapon = Weapon::new(2, 3, 4, 1, 1).with_abilities([
    ///     Bonus::new(Characteristic::Attacks, 1).into(),
    ///     Reroll::new(Phase::Hit, RerollType::Any).into(),
    /// ]);
    /// ```
    pub fn with_abilities<I: IntoIterator<Item = Ability>>(mut self, abilities: I) -> Self {
        abilities.into_iter().for_each(|a| self.abilities.add_ability(&a));
        self
    }

    pub fn abilities(&self) -> &AbilityFacade {
        &self.abilities
    }

    /// Calculate the average damage that this weapon will do.
    pub fn average_damage(&self, target: &Target) -> f64 {
        AverageProvider::new(self, target).average_damage()
    }

    /// Simulate an attack sequence for this weapon.
    pub fn simulate_damage(&self, target: &Target) -> u8 {
        SimulationProvider::new(self, target).simulate_weapon()
    }
}

/// Represents the combination of a given [`Weapon`] and the number of models which have it.
#[derive(Debug)]
pub struct ModelGroup {
    pub quantity: u8,
    pub weapon: Weapon,
    pub leader_bonus: Option<(u8, Bonus)>,
}

impl ModelGroup {
    /// Constructs a new `ModelGroup`
    pub fn new(quantity: u8, weapon: Weapon) -> Self {
        Self {
            quantity,
            weapon,
            leader_bonus: None,
        }
    }

    /// Indicate that this grouping has a number of champion/leader models, which have a bonus to
    /// one of the weapons characteristics.
    ///
    /// ```
    /// # use aos_statshammer::{Weapon, ModelGroup, Characteristic};
    /// # use aos_statshammer::abilities::{Bonus};
    /// # let weapon = Weapon::new(2, 3, 4, 1, 1);
    /// let _ = ModelGroup::new(10, weapon).with_leader(1, Bonus::new(Characteristic::Attacks, 1));
    /// ```
    pub fn with_leader(mut self, num_models: u8, bonus: Bonus) -> Self {
        self.leader_bonus = Some((num_models, bonus));
        self
    }

    /// Calculate the average damage that this group of models will do.
    pub fn average_damage(&self, target: &Target) -> f64 {
        self.apply_weapons(|w| w.average_damage(target))
    }

    /// Simulate an attack sequence for this group of models.
    pub fn simulate_damage(&self, target: &Target) -> u8 {
        self.apply_weapons(|w| w.simulate_damage(target))
    }

    fn apply_weapons<T, F>(&self, f: F) -> T
    where
        T: Num + From<u8>,
        F: Fn(&Weapon) -> T,
    {
        let mut quantity = self.quantity;
        let leader_result = match &self.leader_bonus {
            Some((leader_quantity, ability)) => {
                quantity -= leader_quantity;
                let leader_weapon = self.weapon.clone().with_ability(ability.clone());
                // *leader_quantity as f64 * leader_weapon.average_damage(save)
                T::from(*leader_quantity) * f(&leader_weapon)
            }
            None => zero(),
        };
        // quantity as f64 * self.weapon.average_damage(save) + leader_result
        T::from(quantity) * f(&self.weapon) + leader_result
    }
}

/// Represents a unit, containing a number of [`ModelGroups`](ModelGroup) each with their own
/// quantities and [`Weapons`](Weapon).
#[derive(Debug)]
pub struct Unit {
    pub name: String,
    pub models: Vec<ModelGroup>,
}

impl Unit {
    /// Constructs a new `Unit`
    pub fn new(name: String) -> Self {
        Self {
            name,
            models: vec![],
        }
    }

    /// Add a new group of models for this unit.
    pub fn add_model_group(mut self, model_group: ModelGroup) -> Self {
        self.models.push(model_group);
        self
    }

    /// Calculate the average damage that this unit will do.
    pub fn average_damage(&self, target: &Target) -> f64 {
        self.models
            .iter()
            .fold(0.0, |acc, group| acc + group.average_damage(target))
    }

    /// Simulate an attack sequence for this unit.
    pub fn simulate_damage(&self, target: &Target) -> u8 {
        self.models
            .iter()
            .fold(0, |acc, group| acc + group.simulate_damage(target))
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::Characteristic as C;
    use assert_float_eq::*;

    #[test]
    fn test_leader_bonus() {
        let unit_with_leader = Unit::new("Unit with leader".to_string()).add_model_group(
            ModelGroup::new(10, Weapon::new(2, 3, 3, 1, 1))
                .with_leader(1, Bonus::new(C::Attacks, 1)),
        );
        let equivalent_leader = Unit::new("Unit with no leader".to_string())
            .add_model_group(ModelGroup::new(9, Weapon::new(2, 3, 3, 1, 1)))
            .add_model_group(ModelGroup::new(1, Weapon::new(3, 3, 3, 1, 1)));
        assert_float_absolute_eq!(
            unit_with_leader.average_damage(&4.into()),
            equivalent_leader.average_damage(&4.into())
        );
    }
}
