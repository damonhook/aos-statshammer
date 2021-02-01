import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import UIStore, { HomeTab } from 'types/store/ui'

const INITIAL_STATE: UIStore = {
  homeTab: 'units',
}

export default createSlice({
  name: 'ui',
  initialState: INITIAL_STATE,
  reducers: {
    setHomeTab(state: UIStore, action: PayloadAction<{ tab: HomeTab }>) {
      const { tab } = action.payload
      state.homeTab = tab
    },
  },
})
