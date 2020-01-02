import store from 'store';

export const isDarkModeEnabled = () => store.getState().config.darkMode;

export const isDesktopGraphListEnabled = () => store.getState().config.desktopGraphList;
