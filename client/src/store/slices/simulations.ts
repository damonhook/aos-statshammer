import { createSlice } from '@reduxjs/toolkit';
import { IProbability, TSimResult } from 'types/simulations';
import { ISimulationsStore, TError } from 'types/store';

const INITIAL_STATE: ISimulationsStore = {
  pending: false,
  results: [],
  probabilities: [],
  error: null,
};

export const fetchSimulationsPending = (state: ISimulationsStore) => {
  state.pending = true;
  state.error = null;
};

export const fetchSimulationsSuccess = (
  state: ISimulationsStore,
  action: { payload: { results: TSimResult[]; probabilities: IProbability[] } },
) => {
  const { results, probabilities } = action.payload;
  state.pending = false;
  state.error = null;
  state.results = results;
  state.probabilities = probabilities;
};

export const fetchSimulationsError = (state: ISimulationsStore, action: { payload: { error: TError } }) => {
  const { error } = action.payload;
  state.pending = false;
  state.error = error;
};

export const simulations = createSlice({
  name: 'simulations',
  initialState: INITIAL_STATE,
  reducers: {
    fetchSimulationsPending,
    fetchSimulationsSuccess,
    fetchSimulationsError,
  },
});
