import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import { Modifier } from 'types/modifierInstance'
import TargetStore from 'types/store/target'

const INITIAL_STATE: TargetStore = {
  modifiers: [],
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

    deleteModifier(state: TargetStore, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload
      state.modifiers = state.modifiers.filter(m => m.id !== id)
    },

    clearTarget(state: TargetStore) {
      state.modifiers = []
    },
  },
})
