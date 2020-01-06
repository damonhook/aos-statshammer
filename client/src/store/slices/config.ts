import { createSlice } from '@reduxjs/toolkit';
import { IConfigStore } from 'types/store';

const INITIAL_STATE: IConfigStore = {
  darkMode: false,
  desktopGraphList: false,
};

const toggleDarkMode = (state: IConfigStore) => {
  state.darkMode = !state.darkMode;
};

const toggleDesktopGraphList = (state: IConfigStore) => {
  state.desktopGraphList = !state.desktopGraphList;
};

export const config = createSlice({
  name: 'config',
  initialState: INITIAL_STATE,
  reducers: {
    toggleDarkMode,
    toggleDesktopGraphList,
  },
});
