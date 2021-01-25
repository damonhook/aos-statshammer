import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import SimulationsStore, { SimulationResult } from 'types/store/simulations'

const INITIAL_STATE: SimulationsStore = {
  pending: false,
  results: [],
}

export default createSlice({
  name: 'simulations',
  initialState: INITIAL_STATE,
  reducers: {
    simulationsPending(state: SimulationsStore) {
      state.pending = true
    },

    simulationsSucess(state: SimulationsStore, action: PayloadAction<{ results: SimulationResult[] }>) {
      const { results } = action.payload
      state.results = results
      state.pending = false
    },

    simulationsError(state: SimulationsStore) {
      Object.assign(state, INITIAL_STATE)
    },
  },
})
