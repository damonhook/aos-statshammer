use super::{Dice, Roller};
use num_traits::{zero, Num};
use std::{
    fmt::Display,
    ops::{Add, AddAssign, Mul, Sub, SubAssign},
    str::FromStr,
};

/// Represents an expression containing a combination of [`Dice`] and constant values (e.g: D6 + 1).
#[derive(Debug, Default, Clone, PartialEq, Eq)]
pub struct DiceNotation {
    dice: Vec<(bool, Dice)>,
    constant: i8,
}

impl DiceNotation {
    pub fn new() -> Self {
        Self {
            dice: vec![],
            constant: 0,
        }
    }

    pub fn average(&self) -> f64 {
        (self.apply_dice(|d| d.average()) + self.constant as f64).max(0.0)
    }

    fn apply_dice<T, F>(&self, f: F) -> T
    where
        T: Num,
        F: Fn(&Dice) -> T,
    {
        self.dice.iter().fold(zero(), |acc, (op, d)| {
            let val = f(d);
            match op {
                true => acc + val,
                false => acc - val,
            }
        })
    }
}

impl Roller for DiceNotation {
    fn roll(&self) -> u8 {
        (self.apply_dice(|d| d.roll() as i16) + self.constant as i16).max(0) as u8
    }
}

impl Display for DiceNotation {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        for (i, (op, d)) in self.dice.iter().enumerate() {
            if i == 0 {
                write!(f, "{}", d)?;
            } else {
                let op_str = if *op { "+" } else { "-" };
                write!(f, "{}{}", d, op_str)?;
            }
        }
        write!(f, "{}", self.constant)
    }
}

impl From<Dice> for DiceNotation {
    fn from(value: Dice) -> Self {
        DiceNotation {
            dice: vec![(true, value)],
            constant: 0,
        }
    }
}
impl From<i8> for DiceNotation {
    fn from(value: i8) -> Self {
        DiceNotation {
            dice: vec![],
            constant: value,
        }
    }
}
impl From<(u8, Dice)> for DiceNotation {
    fn from(value: (u8, Dice)) -> Self {
        DiceNotation {
            dice: (0..value.0).map(|_| (true, value.1)).collect(),
            constant: 0,
        }
    }
}

impl<T> Add<T> for Dice
where
    DiceNotation: From<T>,
{
    type Output = DiceNotation;
    fn add(self, rhs: T) -> Self::Output {
        DiceNotation::from(rhs) + self
    }
}

impl<T> Sub<T> for Dice
where
    DiceNotation: From<T>,
{
    type Output = DiceNotation;
    fn sub(self, rhs: T) -> Self::Output {
        DiceNotation::from(rhs) - self
    }
}

impl Mul<u8> for Dice {
    type Output = DiceNotation;
    fn mul(self, rhs: u8) -> Self::Output {
        DiceNotation::new() + (rhs, self)
    }
}

impl Mul<Dice> for u8 {
    type Output = DiceNotation;
    fn mul(self, rhs: Dice) -> Self::Output {
        rhs * self
    }
}

impl<T> AddAssign<T> for DiceNotation
where
    T: Into<DiceNotation>,
{
    fn add_assign(&mut self, rhs: T) {
        let other: Self = rhs.into();
        self.dice.extend(other.dice);
        self.constant += other.constant;
    }
}

impl<T> Add<T> for DiceNotation
where
    T: Into<DiceNotation>,
{
    type Output = Self;
    fn add(self, rhs: T) -> Self::Output {
        let mut new = self.clone();
        new += rhs;
        new
    }
}

impl<T> SubAssign<T> for DiceNotation
where
    T: Into<DiceNotation>,
{
    fn sub_assign(&mut self, rhs: T) {
        let other: Self = rhs.into();
        self.dice
            .extend(other.dice.iter().map(|(opt, d)| (!opt, *d)));
        self.constant -= other.constant;
    }
}

impl<T> Sub<T> for DiceNotation
where
    T: Into<DiceNotation>,
{
    type Output = Self;
    fn sub(self, rhs: T) -> Self::Output {
        let mut new = self.clone();
        new -= rhs;
        new
    }
}

impl TryFrom<&str> for DiceNotation {
    type Error = &'static str;
    fn try_from(value: &str) -> Result<Self, Self::Error> {
        Err("Not implemented")
    }
}

impl FromStr for DiceNotation {
    type Err = &'static str;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Self::try_from(s)
    }
}

#[cfg(test)]
mod tests {
    use super::super::{D3, D6};
    use super::*;
    use assert_float_eq::*;
    use test_case::test_case;

    #[test_case(D6.into(), 3.5 ; "d6")]
    #[test_case(D6 + 1, 4.5 ; "d6 + 1")]
    #[test_case(2 * D6 + 1, 8.0 ; "2d6 + 1")]
    fn test_dice_notation_average(input: DiceNotation, expected: f64) {
        assert_float_absolute_eq!(input.average(), expected, 0.0005);
    }

    #[test]
    fn test_dice_add_dice() {
        assert_eq!(
            D6 + D6,
            DiceNotation {
                dice: vec![(true, D6), (true, D6)],
                constant: 0
            }
        )
    }

    #[test]
    fn test_dice_add_number() {
        assert_eq!(
            D6 + 2,
            DiceNotation {
                dice: vec![(true, D6)],
                constant: 2
            }
        )
    }

    #[test]
    fn test_dice_multiple() {
        assert_eq!(
            2 * D6,
            DiceNotation {
                dice: vec![(true, D6), (true, D6)],
                constant: 0
            }
        )
    }

    #[test]
    fn test_create_dice_notation_using_complex_arithmetic() {
        assert_eq!(
            (2 * D6) - D3 + 2,
            DiceNotation {
                dice: vec![(true, D6), (true, D6), (false, D3)],
                constant: 2
            }
        );
    }
}
