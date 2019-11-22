import { FETCH_STATS_PENDING, FETCH_STATS_SUCCESS, FETCH_STATS_ERROR } from '../actions/stats.action';

const INITIAL_STATS = {
  pending: false,
  payload: {},
  error: null,
};

const stats = (state = INITIAL_STATS, action) => {
  switch (action.type) {
    case FETCH_STATS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_STATS_SUCCESS:
      return {
        ...state,
        pending: false,
        payload: action.payload,
      };
    case FETCH_STATS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default stats;
