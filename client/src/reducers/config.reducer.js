import { TOGGLE_DARK_MODE } from 'actions/config.action';


const DEFAULT_STATE = {
  darkMode: true,
};

const toggleDarkMode = (state) => ({
  ...state,
  darkMode: !state.darkMode,
});

const configReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return toggleDarkMode(state, action);
    default:
      return state;
  }
};

export default configReducer;
