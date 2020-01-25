import { createSlice } from '@reduxjs/toolkit';
import { IConfigStore } from 'types/store';
import appConfig from 'appConfig';

const INITIAL_STATE: IConfigStore = {
  darkMode: false,
  desktopGraphList: false,
  numSimulations: appConfig.simulations.default,
};

const toggleDarkMode = (state: IConfigStore) => {
  state.darkMode = !state.darkMode;
};

const toggleDesktopGraphList = (state: IConfigStore) => {
  state.desktopGraphList = !state.desktopGraphList;
};

const changeNumSimulations = (state: IConfigStore, action: { payload: { newValue: number } }) => {
  const { newValue } = action.payload;
  state.numSimulations = newValue;
};

export const config = createSlice({
  name: 'config',
  initialState: INITIAL_STATE,
  reducers: {
    toggleDarkMode,
    toggleDesktopGraphList,
    changeNumSimulations,
  },
});
