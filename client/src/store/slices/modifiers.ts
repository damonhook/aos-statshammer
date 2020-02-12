import { createSlice } from '@reduxjs/toolkit';
import { IModifierDefinition } from 'types/modifiers';
import { IModifiersStore, TError } from 'types/store';

const INITIAL_STATE: IModifiersStore = {
  pending: false,
  error: null,
  modifiers: [],
};

export const fetchModifiersPending = (state: IModifiersStore) => {
  state.pending = true;
};

export const fetchModifiersSuccess = (
  state: IModifiersStore,
  action: { payload: { modifiers: IModifierDefinition[] } },
) => {
  const { modifiers } = action.payload;
  state.pending = false;
  state.modifiers = modifiers;
};

export const fetchModifiersError = (state: IModifiersStore, action: { payload: { error: TError } }) => {
  const { error } = action.payload;
  state.pending = false;
  state.error = error;
};

export const modifiers = createSlice({
  name: 'modifiers',
  initialState: INITIAL_STATE,
  reducers: {
    fetchModifiersPending,
    fetchModifiersSuccess,
    fetchModifiersError,
  },
});
