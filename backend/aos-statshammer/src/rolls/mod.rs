#[cfg(test)]
use mockall::automock;

mod dice;
pub use dice::*;

mod dice_notation;
pub use dice_notation::*;

#[cfg_attr(test, automock)]
pub trait Roller {
    fn roll(&self) -> u8;
}
