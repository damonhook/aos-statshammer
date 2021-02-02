import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import { Modifier } from 'types/modifierInstance'
import TargetStore from 'types/store/target'
import { TargetErrors } from 'types/validation/targetErrors'
import { moveItemInArray, removeEmpty } from 'utils/helpers'

const INITIAL_STATE: TargetStore = {
  modifiers: [],
  errors: undefined,
}

export default createSlice({
  name: 'target',
  initialState: INITIAL_STATE,
  reducers: {
    addModifier(state: TargetStore, action: PayloadAction<{ modifier: Omit<Modifier, 'id'> }>) {
      const { modifier } = action.payload
      state.modifiers.push({ ...modifier, id: nanoid() })
    },

    addModifiers(state: TargetStore, action: PayloadAction<{ modifiers: Omit<Modifier, 'id'>[] }>) {
      const { modifiers } = action.payload
      state.modifiers.push(...modifiers.map(m => ({ ...m, id: nanoid() })))
    },

    setModifierDisabled(state: TargetStore, action: PayloadAction<{ id: string; disabled: boolean }>) {
      const { id, disabled } = action.payload
      const mod = state.modifiers.find(m => m.id === id)
      if (mod) mod.disabled = disabled
    },

    editModifierOption(
      state: TargetStore,
      action: PayloadAction<{ id: string; key: string; value: string | number | boolean }>
    ) {
      const { id, key, value } = action.payload
      const mod = state.modifiers.find(m => m.id === id)
      if (mod) mod.options[key] = value
    },

    moveModifier(state: TargetStore, action: PayloadAction<{ index: number; newIndex: number }>) {
      const { index, newIndex } = action.payload
      state.modifiers = moveItemInArray(state.modifiers, index, newIndex)
    },

    deleteModifier(state: TargetStore, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload
      state.modifiers = state.modifiers.filter(m => m.id !== id)
    },

    clearTarget(state: TargetStore) {
      state.modifiers = []
      state.errors = undefined
    },

    setErrors(state: TargetStore, action: PayloadAction<{ errors?: Partial<TargetErrors> }>) {
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
