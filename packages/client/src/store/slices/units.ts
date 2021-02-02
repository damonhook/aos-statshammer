import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import UnitsStore, { Unit, UnitParams, WeaponProfileParams } from 'types/store/units'
import { moveItemInArray } from 'utils/helpers'

const INITIAL_STATE: UnitsStore = {
  items: [],
}

const getDefaultUnit = (name: string = 'Unit'): UnitParams => ({
  name: name,
  weaponProfiles: [getDefaultWeaponProfile()],
})

const getDefaultWeaponProfile = (): WeaponProfileParams => ({
  numModels: 10,
  attacks: 1,
  toHit: 4,
  toWound: 4,
  rend: 0,
  damage: 1,
  modifiers: [],
})

export default createSlice({
  name: 'units',
  initialState: INITIAL_STATE,
  reducers: {
    /**
     * Add a single unit to the store. If you do not pass a `unit` in the payload, it will add a default one
     */
    addUnit(state: UnitsStore, action: PayloadAction<{ unit?: UnitParams }>) {
      const unit = action.payload.unit ?? getDefaultUnit(`Unit ${state.items.length + 1}`)
      state.items.push({
        ...unit,
        id: nanoid(),
        weaponProfiles: unit.weaponProfiles.map(profile => ({ ...profile, id: nanoid() })),
      })
    },

    /**
     * Edit a specific unit from the store. You do this by passing an `id` and a partially complete
     * unit object (which it will use to replace the fields which appear in the `newUnit` object)
     */
    editUnit(state: UnitsStore, action: PayloadAction<{ id: string; newUnit: Omit<Unit, 'id'> }>) {
      const { id, newUnit } = action.payload
      const index = state.items.findIndex(u => u.id === id)
      if (index !== -1) {
        const unit = state.items[index]
        state.items[index] = { ...newUnit, id: unit.id }
      }
    },

    editUnitName(state: UnitsStore, action: PayloadAction<{ id: string; name: string }>) {
      const { id, name } = action.payload
      const unit = state.items.find(u => u.id === id)
      if (unit) unit.name = name
    },

    moveUnit(state: UnitsStore, action: PayloadAction<{ index: number; newIndex: number }>) {
      const { index, newIndex } = action.payload
      state.items = moveItemInArray(state.items, index, newIndex)
    },

    deleteUnit(state: UnitsStore, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload
      state.items = state.items.filter(u => u.id !== id)
    },

    clearUnits(state: UnitsStore) {
      state.items = []
    },

    addWeaponProfile(
      state: UnitsStore,
      action: PayloadAction<{ unitId: string; weaponProfile?: WeaponProfileParams }>
    ) {
      const { unitId } = action.payload
      const unit = state.items.find(u => u.id === unitId)
      if (unit) {
        const weaponProfile = action.payload.weaponProfile ?? getDefaultWeaponProfile()
        unit.weaponProfiles.push({ ...weaponProfile, id: nanoid() })
      }
    },

    editWeaponProfile(
      state: UnitsStore,
      action: PayloadAction<{ unitId: string; id: string; newProfile: Partial<WeaponProfileParams> }>
    ) {
      const { unitId, id, newProfile } = action.payload
      const unit = state.items.find(u => u.id === unitId)
      const index = unit ? unit.weaponProfiles.findIndex(p => p.id === id) : -1
      if (unit && index !== -1) {
        const weaponProfile = unit.weaponProfiles[index]
        unit.weaponProfiles[index] = { ...weaponProfile, ...newProfile, id: weaponProfile.id }
      }
    },

    deleteWeaponProfile(state: UnitsStore, action: PayloadAction<{ unitId: string; id: string }>) {
      const { unitId, id } = action.payload
      const unit = state.items.find(u => u.id === unitId)
      if (unit) {
        unit.weaponProfiles = unit.weaponProfiles.filter(profile => profile.id !== id)
      }
    },
  },
})
