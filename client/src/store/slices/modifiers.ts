import { createSlice } from '@reduxjs/toolkit';
import { IModifierDefinition } from 'types/modifiers';
import { IModifiersStore, TError } from 'types/store';

const INITIAL_STATE: IModifiersStore = {
  pending: false,
  error: null,
  items: [],
};

export const fetchModifiersPending = (state: IModifiersStore) => {
  state.pending = true;
};

export const fetchModifiersSuccess = (
  state: IModifiersStore,
  action: { payload: { items: IModifierDefinition[] } },
) => {
  const { items } = action.payload;
  state.pending = false;
  state.items = items;
};

export const fetchModifiersError = (state: IModifiersStore, action: { payload: { error: TError } }) => {
  const { error } = action.payload;
  state.pending = false;
  state.error = error;
};

export const modifiersStore = createSlice({
  name: 'modifiers',
  initialState: INITIAL_STATE,
  reducers: {
    fetchModifiersPending,
    fetchModifiersSuccess,
    fetchModifiersError,
  },
});
