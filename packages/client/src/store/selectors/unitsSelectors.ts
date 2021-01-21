import { createSelector } from 'reselect'
import type Store from 'types/store'

export const unitsSelector = (state: Store) => state.units.items

export const findUnitSelector = createSelector(
  unitsSelector,
  (_: any, props: { unitId?: string }) => props,
  (units, { unitId }) => units.find(unit => unit.id === unitId)
)

export const findWeaponProfileSelector = createSelector(
  unitsSelector,
  (_: any, props: { unitId?: string; id?: string }) => props,
  (units, { unitId, id }) => {
    const unit = units.find(unit => unit.id === unitId)
    return unit ? unit.weaponProfiles.find(profile => profile.id === id) : undefined
  }
)

export const activeUnitsSelector = createSelector(
  unitsSelector,
  units =>
    units
      .map(unit => ({
        ...unit,
        weaponProfiles: unit.weaponProfiles
          .filter(p => !p.disabled) // Filter out disabled weapon profiles
          .map(p => ({
            ...p,
            modifiers: p.modifiers.filter(m => !m.disabled), // Filter out disabled modifiers
          })),
      }))
      .filter(unit => unit.weaponProfiles && unit.weaponProfiles.length) // Filter out units with no profiles
)
