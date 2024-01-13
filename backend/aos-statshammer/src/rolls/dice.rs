use num_traits::Num;
use rand::Rng;
use std::fmt::Display;
use super::Roller;

/// Represents a single Dice (Die) with a given number of sides (faces).
///
/// You can perform operations on a `Dice` struct in order to create [`DiceNotation`] structs
///
/// ```
/// # use aos_statshammer::{Dice};
/// let _ = Dice::new(6) + 1; // D6 + 1
/// let _ = 2 * Dice::new(6) + 2; // 2D6 + 2
/// ```
///
/// There are 2 constant Dice objects exposed for ease of use [`D6`] and [`D3`] (equivalent to
/// `Dice::new(6)` and `Dice::new(3)` respectively)
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Dice {
    /// number of sides for the dice
    pub sides: u8,
}

impl Dice {
    pub fn new(sides: u8) -> Self {
        Self { sides }
    }

    pub fn probability<T: Num + Into<f64>>(&self, target: T) -> f64 {
        let upper_bounds = (self.sides as f64) + 1.0;
        let target: f64 = target.into();
        if target > upper_bounds {
            0.0
        } else {
            ((upper_bounds - target) / self.sides as f64).clamp(0.0, 1.0)
        }
    }

    pub fn inverse_probability<T: Num + Into<f64>>(&self, target: T) -> f64 {
        1.0 - self.probability(target)
    }

    pub fn average(&self) -> f64 {
        (self.sides as f64 + 1.0) / 2.0
    }
}

impl Roller for Dice {
    fn roll(&self) -> u8 {
        rand::thread_rng().gen_range(1..=self.sides)
    }
}

impl Display for Dice {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "D{}", self.sides)
    }
}

/// A [`Dice`] with 6 sides. Equivalent to `Dice::new(6)`.
pub const D6: Dice = Dice { sides: 6 };
/// A [`Dice`] with 3 sides. Equivalent to `Dice::new(3)`.
pub const D3: Dice = Dice { sides: 3 };
