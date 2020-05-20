import { createSlice } from '@reduxjs/toolkit';
import type { IModifierDefinition } from 'types/modifiers';
import type { ITargetModifiersStore, TError } from 'types/store';

const INITIAL_STATE: ITargetModifiersStore = {
  pending: false,
  error: null,
  items: [],
};

export const fetchTargetModifiersPending = (state: ITargetModifiersStore) => {
  state.pending = true;
};

export const fetchTargetModifiersSuccess = (
  state: ITargetModifiersStore,
  action: { payload: { items: IModifierDefinition[] } },
) => {
  const { items } = action.payload;
  state.pending = false;
  state.items = items;
};

export const fetchTargetModifiersError = (
  state: ITargetModifiersStore,
  action: { payload: { error: TError } },
) => {
  const { error } = action.payload;
  state.pending = false;
  state.error = error;
};

export const targetModifiersStore = createSlice({
  name: 'targetModifiers',
  initialState: INITIAL_STATE,
  reducers: {
    fetchTargetModifiersPending,
    fetchTargetModifiersSuccess,
    fetchTargetModifiersError,
  },
});
