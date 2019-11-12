import { FETCH_MODIFIERS_PENDING, FETCH_MODIFIERS_SUCCESS, FETCH_MODIFIERS_ERROR } from "./../actions/modifiers.action";

const INITIAL_STATE = {
  pending: false,
  error: null,
  modifiers: [],
}

const modifiers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_MODIFIERS_PENDING:
      return {
        ...state,
        pending: true
      }
    case FETCH_MODIFIERS_SUCCESS:
      return {
        ...state,
        pending: false,
        modifiers: action.payload.modifiers
      }
    case FETCH_MODIFIERS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload.error
      }
    default:
      return state
  }
}

export default modifiers
