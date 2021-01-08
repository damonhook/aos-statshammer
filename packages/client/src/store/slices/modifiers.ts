import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ModifiersStore, { ModifiersData } from 'types/store/modifiers'

const INITIAL_STATE: ModifiersStore = {
  pending: false,
  modifiers: [],
  targetModifiers: [],
}

export default createSlice({
  name: 'modifiers',
  initialState: INITIAL_STATE,
  reducers: {
    modifiersPending(state: ModifiersStore) {
      state.pending = true
    },
    modifiersSucess(state: ModifiersStore, action: PayloadAction<ModifiersData>) {
      Object.assign(state, action.payload)
      state.pending = false
    },
    modifiersError(state: ModifiersStore) {
      Object.assign(state, INITIAL_STATE)
    },
  },
})
