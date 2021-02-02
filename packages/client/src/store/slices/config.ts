import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ConfigStore from 'types/store/config'

const INITIAL_STATE: ConfigStore = {
  darkMode: false,
  numSimulations: 5000,
}

export default createSlice({
  name: 'config',
  initialState: INITIAL_STATE,
  reducers: {
    setDarkMode(state: ConfigStore, action: PayloadAction<{ darkMode: boolean }>) {
      const { darkMode } = action.payload
      state.darkMode = darkMode
    },

    setNumSimulations(state: ConfigStore, action: PayloadAction<{ newValue: number }>) {
      const { newValue } = action.payload
      state.numSimulations = newValue
    },
  },
})
