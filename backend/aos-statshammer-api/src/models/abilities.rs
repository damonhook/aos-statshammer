use crate::serde_utils::*;
use aos_statshammer as lib;
use serde::Deserialize;

#[derive(Debug, Clone, Copy, Deserialize, utoipa::ToSchema)]
pub enum Characteristic {
    Attacks,
    ToHit,
    ToWound,
    Rend,
    Damage,
}
impl From<Characteristic> for lib::Characteristic {
    fn from(value: Characteristic) -> Self {
        match value {
            Characteristic::Attacks => Self::Attacks,
            Characteristic::ToHit => Self::ToHit,
            Characteristic::ToWound => Self::ToWound,
            Characteristic::Rend => Self::Rend,
            Characteristic::Damage => Self::Damage,
        }
    }
}

#[derive(Debug, Clone, Copy, Deserialize, utoipa::ToSchema)]
pub enum Phase {
    Hit,
    Wound,
}
impl From<Phase> for lib::Phase {
    fn from(value: Phase) -> Self {
        match value {
            Phase::Hit => Self::Hit,
            Phase::Wound => Self::Wound,
        }
    }
}

#[derive(Debug, Deserialize, utoipa::ToSchema)]
pub struct Bonus {
    pub characteristic: Characteristic,
    #[serde(default = "default_u8::<1>")]
    pub value: u8,
}

#[derive(Debug, Deserialize, utoipa::ToSchema)]
pub struct Exploding {
    pub phase: Phase,
    #[serde(default = "default_u8::<6>")]
    pub target: u8,
    #[serde(default = "default_u8::<1>")]
    pub additional: u8,
    #[serde(default = "default_bool::<true>")]
    pub unmodified: bool,
}

#[derive(Debug, Deserialize, utoipa::ToSchema)]
#[serde(tag = "type", content = "value")]
pub enum Ability {
    Bonus(Bonus),
    Exploding(Exploding),
}
impl From<&Ability> for lib::abilities::Ability {
    fn from(value: &Ability) -> Self {
        match value {
            Ability::Bonus(a) => Self::from(lib::abilities::Bonus::new(
                (a.characteristic).into(),
                a.value as i8,
            )),
            Ability::Exploding(a) => Self::from(lib::abilities::Exploding::new(
                a.phase.into(),
                a.target,
                a.additional as i8,
                a.unmodified,
            )),
        }
    }
}
