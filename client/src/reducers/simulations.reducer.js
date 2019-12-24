import {
  FETCH_SIMULATIONS_PENDING, FETCH_SIMULATIONS_SUCCESS, FETCH_SIMULATIONS_ERROR,
} from '../actions/simulations.action';

const INITIAL_SIMULATIONS = {
  pending: false,
  results: null,
  probabilities: null,
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
        results: action.results,
        probabilities: action.probabilities,
        error: null,
      };
    case FETCH_SIMULATIONS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default simulationsReducer;
