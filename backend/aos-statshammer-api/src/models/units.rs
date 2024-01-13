use super::abilities::*;
use aos_statshammer as lib;
use serde::Deserialize;

#[derive(Debug, Deserialize, utoipa::ToSchema)]
pub struct Weapon {
    pub attacks: u8,
    pub to_hit: u8,
    pub to_wound: u8,
    #[serde(default)]
    pub rend: u8,
    pub damage: u8,
    #[serde(default)]
    pub abilities: Vec<Ability>,
}
impl From<&Weapon> for lib::Weapon {
    fn from(value: &Weapon) -> Self {
        let abilities = value.abilities.iter().map(lib::abilities::Ability::from);
        Self::new(
            value.attacks as i8,
            value.to_hit,
            value.to_wound,
            value.rend,
            value.damage as i8,
        )
        .with_abilities(abilities)
    }
}

#[derive(Debug, Deserialize, utoipa::ToSchema)]
pub struct ModelGroup {
    pub quantity: u8,
    pub weapon: Weapon,
}
impl From<&ModelGroup> for lib::ModelGroup {
    fn from(value: &ModelGroup) -> Self {
        Self::new(value.quantity, lib::Weapon::from(&value.weapon))
    }
}

#[derive(Debug, Deserialize, utoipa::ToSchema)]
pub struct Unit {
    pub name: String,
    pub models: Vec<ModelGroup>,
}
impl From<&Unit> for lib::Unit {
    fn from(value: &Unit) -> Self {
        let mut unit = Self::new(value.name.to_owned());
        for model_group_data in &value.models {
            unit = unit.add_model_group(lib::ModelGroup::from(model_group_data));
        }
        unit
    }
}
