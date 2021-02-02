import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import UIStore, { HomeTab, HomeUI, SimulationsUI, StatsUI } from 'types/store/ui'

const INITIAL_STATE: UIStore = {
  home: {
    tab: 'units',
  },
  stats: {
    graphTab: 'bar',
  },
  simulations: {
    save: 4,
    referenceLines: undefined,
    inverted: false,
  },
}

export default createSlice({
  name: 'ui',
  initialState: INITIAL_STATE,
  reducers: {
    setHomeUI(state: UIStore, action: PayloadAction<Partial<HomeUI>>) {
      state.home = { ...state.home, ...action.payload }
    },

    setStatsUI(state: UIStore, action: PayloadAction<Partial<StatsUI>>) {
      state.stats = { ...state.stats, ...action.payload }
    },

    setSimulationsUI(state: UIStore, action: PayloadAction<Partial<SimulationsUI>>) {
      state.simulations = { ...state.simulations, ...action.payload }
    },
  },
})
