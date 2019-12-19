import {
  FETCH_SIMULATIONS_PENDING, FETCH_SIMULATIONS_SUCCESS, FETCH_SIMULATIONS_ERROR,
} from '../actions/simulations.action';

const INITIAL_SIMULATIONS = {
  pending: false,
  payload: null,
  error: null,
};

const simulationsReducer = (state = INITIAL_SIMULATIONS, action) => {
  switch (action.type) {
    case FETCH_SIMULATIONS_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case FETCH_SIMULATIONS_SUCCESS:
      return {
        ...state,
        pending: false,
        payload: action.payload,
        error: null,
      };
    case FETCH_SIMULATIONS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default simulationsReducer;
