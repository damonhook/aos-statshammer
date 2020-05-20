import { createSlice } from '@reduxjs/toolkit';
import type { ISimulationResult } from 'types/simulations';
import type { ISimulationsStore, TError } from 'types/store';

const INITIAL_STATE: ISimulationsStore = {
  pending: false,
  results: [],
  error: null,
};

export const fetchSimulationsPending = (state: ISimulationsStore) => {
  state.pending = true;
  state.error = null;
};

export const fetchSimulationsSuccess = (
  state: ISimulationsStore,
  action: { payload: { results: ISimulationResult[] } },
) => {
  const { results } = action.payload;
  state.pending = false;
  state.error = null;
  state.results = results;
};

export const fetchSimulationsError = (state: ISimulationsStore, action: { payload: { error: TError } }) => {
  const { error } = action.payload;
  state.pending = false;
  state.error = error;
};

export const simulationsStore = createSlice({
  name: 'simulations',
  initialState: INITIAL_STATE,
  reducers: {
    fetchSimulationsPending,
    fetchSimulationsSuccess,
    fetchSimulationsError,
  },
});
