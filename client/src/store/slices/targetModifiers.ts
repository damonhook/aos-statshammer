import { createSlice } from '@reduxjs/toolkit';
import { ITargetModifiersStore, TError } from 'types/store';
import { IModifierDefinition } from 'types/modifiers';

const INITIAL_STATE: ITargetModifiersStore = {
  pending: false,
  error: null,
  modifiers: [],
};

export const fetchTargetModifiersPending = (state: ITargetModifiersStore) => {
  state.pending = true;
};

export const fetchTargetModifiersSuccess = (
  state: ITargetModifiersStore,
  action: { payload: { modifiers: IModifierDefinition[] } },
) => {
  const { modifiers } = action.payload;
  state.pending = false;
  state.modifiers = modifiers;
};

export const fetchTargetModifiersError = (
  state: ITargetModifiersStore,
  action: { payload: { error: TError } },
) => {
  const { error } = action.payload;
  state.pending = false;
  state.error = error;
};

export const targetModifiers = createSlice({
  name: 'targetModifiers',
  initialState: INITIAL_STATE,
  reducers: {
    fetchTargetModifiersPending,
    fetchTargetModifiersSuccess,
    fetchTargetModifiersError,
  },
});
