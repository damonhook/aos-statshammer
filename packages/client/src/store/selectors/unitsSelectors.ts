import { createSelector } from 'reselect'
import type Store from 'types/store'

export const unitsSelector = (state: Store) => state.units.items

// export const weaponProfileSelector = (store: Store, props: { unitId: string; id: string }) => {
//   const unit = store.units.items.find(({ id }) => id === props.unitId)
//   return unit ? unit.weaponProfiles.find(({ id }) => id === props.id) : undefined
// }

export const weaponProfileSelector = createSelector(
  unitsSelector,
  (_: any, props: { unitId?: string; id?: string }) => props,
  (units, { unitId, id }) => {
    const unit = units.find(unit => unit.id === unitId)
    return unit ? unit.weaponProfiles.find(profile => profile.id === id) : undefined
  }
)
