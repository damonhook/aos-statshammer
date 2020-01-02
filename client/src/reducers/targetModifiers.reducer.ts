import {
  FETCH_TARGET_MODIFIERS_PENDING, FETCH_TARGET_MODIFIERS_SUCCESS, FETCH_TARGET_MODIFIERS_ERROR,
} from '../actions/targetModifiers.action';

const INITIAL_STATE = {
  pending: false,
  error: null,
  modifiers: [],
};

const modifiersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TARGET_MODIFIERS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_TARGET_MODIFIERS_SUCCESS:
      return {
        ...state,
        pending: false,
        modifiers: action.modifiers.sort((a, b) => (a.id > b.id ? 1 : -1)),
      };
    case FETCH_TARGET_MODIFIERS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default modifiersReducer;
