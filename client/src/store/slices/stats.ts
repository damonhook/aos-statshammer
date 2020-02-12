import { createSlice } from '@reduxjs/toolkit';
import { TResults } from 'types/stats';
import { IStatsStore, TError } from 'types/store';

const INITIAL_STATE: IStatsStore = {
  pending: false,
  payload: [],
  error: null,
};

const fetchStatsPending = (state: IStatsStore) => {
  state.pending = true;
  state.error = null;
};

const fetchStatsSuccess = (state: IStatsStore, action: { payload: { results: TResults } }) => {
  const { results } = action.payload;
  state.pending = false;
  state.error = null;
  state.payload = results;
};

const fetchStatsError = (state: IStatsStore, action: { payload: { error: TError } }) => {
  const { error } = action.payload;
  state.pending = false;
  state.error = error;
};

export const stats = createSlice({
  name: 'stats',
  initialState: INITIAL_STATE,
  reducers: {
    fetchStatsPending,
    fetchStatsSuccess,
    fetchStatsError,
  },
});
