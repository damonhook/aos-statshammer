import { TOGGLE_DARK_MODE, TOGGLE_DESKTOP_GRAPH_LIST } from 'actions/config.action';
import { IConfigStore } from 'types/store';

const DEFAULT_STATE: IConfigStore = {
  darkMode: false,
  desktopGraphList: false,
};

const toggleDarkMode = (state, action): IConfigStore => ({
  ...state,
  darkMode: !state.darkMode,
});

const toggleDesktopGraphList = (state, action): IConfigStore => ({
  ...state,
  desktopGraphList: !state.desktopGraphList,
});

const configReducer = (state = DEFAULT_STATE, action): IConfigStore => {
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
