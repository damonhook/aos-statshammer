import { createSlice } from '@reduxjs/toolkit';
import { ISimulationsStore, TError } from 'types/store';
import { IProbability, TSimResult } from 'types/simulations';

const INITIAL_STATE: ISimulationsStore = {
  pending: false,
  results: [],
  probabilities: [],
  error: null,
};

export const fetchSimulationsPending = (state: ISimulationsStore) => {
  state.pending = true;
};

export const fetchSimulationsSuccess = (
  state: ISimulationsStore,
  action: { payload: { results: TSimResult[]; probabilities: IProbability[] } },
) => {
  const { results, probabilities } = action.payload;
  state.pending = false;
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
