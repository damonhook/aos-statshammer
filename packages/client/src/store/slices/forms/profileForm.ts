import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import { Modifier } from 'types/modifierInstance'
import ProfileFormStore, { ProfileFormData } from 'types/store/forms/profileForm'
import { ProfileErrors } from 'types/validation'
import { removeEmpty } from 'utils/helpers'

const INITIAL_STATE: ProfileFormStore = {
  data: undefined,
  errors: undefined,
}

export default createSlice({
  name: 'profileForm',
  initialState: INITIAL_STATE,
  reducers: {
    initForm(state: ProfileFormStore, action: PayloadAction<{ weaponProfile?: ProfileFormData }>) {
      const { weaponProfile } = action.payload
      state.data = weaponProfile ? { ...weaponProfile } : undefined
      state.errors = undefined
    },

    editData<T extends keyof Omit<ProfileFormData, 'modifiers'>>(
      state: ProfileFormStore,
      action: PayloadAction<{ key: T; value: ProfileFormData[T] }>
    ) {
      const { key, value } = action.payload
      if (state.data) state.data[key] = value
    },

    addModifier(state: ProfileFormStore, action: PayloadAction<{ modifier: Omit<Modifier, 'id'> }>) {
      const { modifier } = action.payload
      if (state.data) state.data.modifiers.push({ ...modifier, id: nanoid() })
    },

    addModifiers(state: ProfileFormStore, action: PayloadAction<{ modifiers: Omit<Modifier, 'id'>[] }>) {
      const { modifiers } = action.payload
      if (state.data) state.data.modifiers.push(...modifiers.map(m => ({ ...m, id: nanoid() })))
    },

    setModifierDisabled(state: ProfileFormStore, action: PayloadAction<{ id: string; disabled: boolean }>) {
      const { id, disabled } = action.payload
      if (state.data) {
        const mod = state.data.modifiers.find(m => m.id === id)
        if (mod) mod.disabled = disabled
      }
    },

    editModifierOption(
      state: ProfileFormStore,
      action: PayloadAction<{ id: string; key: string; value: string | number | boolean }>
    ) {
      const { id, key, value } = action.payload
      if (state.data) {
        const mod = state.data.modifiers.find(m => m.id === id)
        if (mod) mod.options[key] = value
      }
    },

    deleteModifier(state: ProfileFormStore, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload
      if (state.data) {
        state.data.modifiers = state.data.modifiers.filter(m => m.id !== id)
      }
    },

    clearForm(state: ProfileFormStore) {
      state.data = undefined
      state.errors = undefined
    },

    setErrors(state: ProfileFormStore, action: PayloadAction<{ errors?: Partial<ProfileErrors> }>) {
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
