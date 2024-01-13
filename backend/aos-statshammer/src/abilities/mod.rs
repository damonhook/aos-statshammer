//! Abilities which can be added to [`Weapons`](crate::Weapon).
//!
//! The list of possible abilities can be seen from the [`Ability`] enum, while instructions on
//! how to add abilities to a specific weapon can be seen from the [`Weapon`](crate::Weapon) docs.

use crate::{Characteristic, DiceNotation, Phase};
use derive_more::From;
use derive_new::new;

mod facade;
pub use facade::*;

#[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Clone, Copy)]
pub enum RerollType {
    Ones,
    Failed,
    Any,
}

/// Reroll [`RerollType`] rolls for [`Phase`].
///
/// # Example
///
/// If you have an ability that lets you reroll rolls of 1 to hit.
///
/// ```
/// # use aos_statshammer::{abilities::{Reroll, RerollType}, Phase};
/// let _ = Reroll::new(Phase::Hit, RerollType::Ones);
/// ```
#[derive(Debug, new, Clone, PartialEq, Eq)]
pub struct Reroll {
    pub phase: Phase,
    pub reroll_type: RerollType,
}

/// Add a bonus to a specific value to a specified [`Characteristic`].
///
/// # Examples
///
/// ```
/// # use aos_statshammer::{abilities::{Bonus}, Characteristic, D3, D6};
/// let _ = Bonus::new(Characteristic::ToHit, 1); // Add 1 to hit.
/// let _ = Bonus::new(Characteristic::Attacks, D6); // Add D6 to attacks characteristic.
/// let _ = Bonus::new(Characteristic::Attacks, D3 + 1); // Add D3 + 1 to damage characteristic.
/// ```
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Bonus {
    pub characteristic: Characteristic,
    pub value: DiceNotation,
}
impl Bonus {
    pub fn new<T>(characteristic: Characteristic, value: T) -> Self
    where
        T: Into<DiceNotation>,
    {
        Self {
            characteristic,
            value: value.into(),
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Exploding {
    pub phase: Phase,
    pub target: u8,
    pub additional: DiceNotation,
    pub unmodified: bool,
}
impl Exploding {
    pub fn new<T>(phase: Phase, target: u8, additional: T, unmodified: bool) -> Self
    where
        T: Into<DiceNotation>,
    {
        Self {
            phase,
            target,
            additional: additional.into(),
            unmodified,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MortalWounds {
    pub phase: Phase,
    pub target: u8,
    pub mortals: DiceNotation,
    pub unmodified: bool,
    pub in_addition: bool,
}
impl MortalWounds {
    pub fn new<T>(phase: Phase, target: u8, mortals: T, unmodified: bool, in_addition: bool) -> Self
    where
        T: Into<DiceNotation>,
    {
        Self {
            phase,
            target,
            mortals: mortals.into(),
            unmodified,
            in_addition,
        }
    }
}

#[derive(Debug, From, new, Clone)]
pub enum Ability {
    Reroll(Reroll),
    Bonus(Bonus),
    Exploding(Exploding),
    MortalWounds(MortalWounds),
}
