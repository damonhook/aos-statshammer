export const FETCH_SIMULATIONS_PENDING = 'FETCH_SIMULATIONS_PENDING';
export const FETCH_SIMULATIONS_SUCCESS = 'FETCH_SIMULATIONS_SUCCESS';
export const FETCH_SIMULATIONS_ERROR = 'FETCH_SIMULATIONS_ERROR';

export const fetchSimulationsPending = () => ({
  type: FETCH_SIMULATIONS_PENDING,
});

export const fetchSimulationsSuccess = (payload) => ({
  type: FETCH_SIMULATIONS_SUCCESS,
  payload,
});

export const fetchSimulationsError = (error) => ({
  type: FETCH_SIMULATIONS_ERROR,
  payload: { error },
});
