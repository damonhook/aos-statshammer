import { FETCH_TABLE_PENDING, FETCH_TABLE_SUCCESS, FETCH_TABLE_ERROR } from "./../actions/stats.action";

const INITIAL_STATS = {
  pending: false,
  payload: {},
  error: null
}

const stats = (state = INITIAL_STATS, action) => {
  switch (action.type) {
    case FETCH_TABLE_PENDING:
      return {
        ...state,
        pending: true
      }
    case FETCH_TABLE_SUCCESS:
      return {
        ...state,
        pending: false,
        payload: action.payload
      }
    case FETCH_TABLE_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload.error
      }
    default:
      return state
  }
}

export default stats
