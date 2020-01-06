import nanoid from 'nanoid';
import { createSlice } from '@reduxjs/toolkit';
import { ITargetStore } from 'types/store';
import { IModifierInstanceParameter, TOptionValue } from 'types/modifiers';
import { moveItemInArray } from 'reducers/helpers';

const INITIAL_STATE: ITargetStore = {
  modifiers: [],
};

const addTargetModifier = (
  state: ITargetStore,
  action: { payload: { modifier: IModifierInstanceParameter } },
) => {
  const { modifier } = action.payload;
  state.modifiers.push({
    ...modifier,
    uuid: nanoid(),
  });
};

const removeTargetModifier = (state: ITargetStore, action: { payload: { index: number } }) => {
  const { index } = action.payload;
  state.modifiers = state.modifiers.filter((_, i) => i !== index);
};

const clearAllTargetModifiers = (state: ITargetStore) => {
  state = INITIAL_STATE;
};

const moveTargetModifier = (
  state: ITargetStore,
  action: { payload: { index: number; newIndex: number } },
) => {
  const { index, newIndex } = action.payload;
  moveItemInArray(state.modifiers, index, newIndex, newModifiers => {
    state.modifiers = newModifiers;
  });
};

const editTargetModifierOption = (
  state: ITargetStore,
  action: { payload: { index: number; name: string; value: TOptionValue } },
) => {
  const { index, name, value } = action.payload;
  const modifier = state.modifiers.find((_, i) => i === index);
  if (modifier) {
    modifier.options[name] = value;
  }
};

const editTargetModifierError = (
  state: ITargetStore,
  action: { payload: { index: number; error: boolean } },
) => {
  const { index, error } = action.payload;
  const modifier = state.modifiers.find((_, i) => i === index);
  if (modifier) {
    modifier.error = error;
  }
};

export const target = createSlice({
  name: 'target',
  initialState: INITIAL_STATE,
  reducers: {
    addTargetModifier,
    removeTargetModifier,
    clearAllTargetModifiers,
    moveTargetModifier,
    editTargetModifierOption,
    editTargetModifierError,
  },
});
