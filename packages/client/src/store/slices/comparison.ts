import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ComparisonStore, { ComparisonResult } from 'types/store/comparison'

const INITIAL_STATE: ComparisonStore = {
  pending: false,
  results: [],
}

export default createSlice({
  name: 'comparison',
  initialState: INITIAL_STATE,
  reducers: {
    comparisonPending(state: ComparisonStore) {
      state.pending = true
    },

    comparisonSucess(state: ComparisonStore, action: PayloadAction<{ results: ComparisonResult[] }>) {
      const { results } = action.payload
      state.results = results
      state.pending = false
    },

    comparisonError(state: ComparisonStore) {
      Object.assign(state, INITIAL_STATE)
    },
  },
})
