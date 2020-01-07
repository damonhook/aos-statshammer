import store from 'store';

// @ts-ignore
export const isDarkModeEnabled = () => store.getState().config.darkMode;

// @ts-ignore
export const isDesktopGraphListEnabled = () => store.getState().config.desktopGraphList;
