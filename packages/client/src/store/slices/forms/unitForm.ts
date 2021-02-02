import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import UnitFormStore, { UnitFormData } from 'types/store/forms/unitForm'
import { WeaponProfileParams } from 'types/store/units'
import { UnitErrors } from 'types/validation'
import { moveItemInArray, removeEmpty } from 'utils/helpers'

const INITIAL_STATE: UnitFormStore = {
  data: undefined,
  errors: undefined,
}

export default createSlice({
  name: 'unitForm',
  initialState: INITIAL_STATE,
  reducers: {
    initForm(state: UnitFormStore, action: PayloadAction<{ unit?: UnitFormData }>) {
      const { unit } = action.payload
      state.data = unit ? { ...unit } : undefined
      state.errors = undefined
    },

    editData<T extends keyof UnitFormData>(
      state: UnitFormStore,
      action: PayloadAction<{ key: T; value: UnitFormData[T] }>
    ) {
      const { key, value } = action.payload
      if (state.data) state.data[key] = value
    },

    addWeaponProfile(state: UnitFormStore, action: PayloadAction<{ weaponProfile: WeaponProfileParams }>) {
      const { weaponProfile } = action.payload
      if (state.data) state.data.weaponProfiles.push({ ...weaponProfile, id: nanoid() })
    },

    addWeaponProfiles(
      state: UnitFormStore,
      action: PayloadAction<{ weaponProfiles: WeaponProfileParams[] }>
    ) {
      const { weaponProfiles } = action.payload
      if (state.data) state.data.weaponProfiles.push(...weaponProfiles.map(p => ({ ...p, id: nanoid() })))
    },

    editWeaponProfile(
      state: UnitFormStore,
      action: PayloadAction<{ id: string; newProfile: Partial<WeaponProfileParams> }>
    ) {
      const { id, newProfile } = action.payload
      if (state.data) {
        const index = state.data.weaponProfiles.findIndex(p => p.id === id)
        if (index !== -1) {
          const weaponProfile = state.data.weaponProfiles[index]
          state.data.weaponProfiles[index] = { ...weaponProfile, ...newProfile, id: weaponProfile.id }
        }
      }
    },

    moveWeaponProfile(state: UnitFormStore, action: PayloadAction<{ index: number; newIndex: number }>) {
      const { index, newIndex } = action.payload
      if (state.data) {
        state.data.weaponProfiles = moveItemInArray(state.data.weaponProfiles, index, newIndex)
      }
    },

    deleteWeaponProfile(state: UnitFormStore, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload
      if (state.data) {
        state.data.weaponProfiles = state.data.weaponProfiles.filter(profile => profile.id !== id)
      }
    },

    clearForm(state: UnitFormStore) {
      state.data = undefined
      state.errors = undefined
    },

    setErrors(state: UnitFormStore, action: PayloadAction<{ errors?: Partial<UnitErrors> }>) {
      const { errors } = action.payload
      if (errors) {
        const cleaned = removeEmpty({ ...state.errors, ...errors })
        if (cleaned && Object.keys(cleaned).length) {
          state.errors = cleaned
          return
        }
      }
      state.errors = undefined
    },
  },
})
