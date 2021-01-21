import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ConfigStore from 'types/store/config'

const INITIAL_STATE: ConfigStore = {
  darkMode: false,
}

export default createSlice({
  name: 'comparison',
  initialState: INITIAL_STATE,
  reducers: {
    setDarkMode(state: ConfigStore, action: PayloadAction<{ darkMode: boolean }>) {
      const { darkMode } = action.payload
      state.darkMode = darkMode
    },
  },
})
