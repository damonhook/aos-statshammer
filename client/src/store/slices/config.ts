import { createSlice } from '@reduxjs/toolkit';
import appConfig from 'appConfig';
import { IConfigStore } from 'types/store';

const INITIAL_STATE: IConfigStore = {
  darkMode: false,
  desktopGraphList: false,
  numSimulations: appConfig.simulations.default,
  useRailLg: false,
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

const toggleUseRailLg = (state: IConfigStore) => {
  state.useRailLg = !state.useRailLg;
};

export const configStore = createSlice({
  name: 'config',
  initialState: INITIAL_STATE,
  reducers: {
    toggleDarkMode,
    toggleDesktopGraphList,
    changeNumSimulations,
    toggleUseRailLg,
  },
});
