import { TOGGLE_DARK_MODE, TOGGLE_DESKTOP_GRAPH_LIST } from 'actions/config.action';

const DEFAULT_STATE = {
  darkMode: false,
  desktopGraphList: false,
};

const toggleDarkMode = state => ({
  ...state,
  darkMode: !state.darkMode,
});

const toggleDesktopGraphList = state => ({
  ...state,
  desktopGraphList: !state.desktopGraphList,
});

const configReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return toggleDarkMode(state, action);
    case TOGGLE_DESKTOP_GRAPH_LIST:
      return toggleDesktopGraphList(state, action);
    default:
      return state;
  }
};

export default configReducer;
