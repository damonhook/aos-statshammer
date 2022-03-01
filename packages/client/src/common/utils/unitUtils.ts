import { Unit } from 'common/types/unit'

export const filterActiveUnits = (units: Unit[]) =>
  units
    .map(unit => ({
      ...unit,
      weapons: unit.weapons
        .map(weapon => ({
          ...weapon,
          abilities: weapon.abilities.filter(ability => !ability.disabled),
        }))
        .filter(weapon => !weapon.disabled),
    }))
    .filter(unit => unit.weapons.length > 0)
