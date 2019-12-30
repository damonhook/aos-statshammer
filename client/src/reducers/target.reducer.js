import nanoid from 'nanoid';
import {
  ADD_TARGET_MODIFIER, REMOVE_TARGET_MODIFIER, MOVE_TARGET_MODIFIER,
  CLEAR_ALL_TARGET_MODIFIERS, EDIT_TARGET_MODIFIER_OPTION, EDIT_TARGET_MODIFIER_ERROR,
} from '../actions/target.action';
import { updateItemInArray, moveItemInArray } from './helpers';

const INITIAL_STATE = {
  modifiers: [],
};

const addModifier = (state, action) => [
  ...state,
  {
    ...action.modifier,
    uuid: nanoid(),
  },
];

const removeModifier = (state, action) => state.filter((_, index) => index !== action.index);

const moveModifier = (state, action) => (
  moveItemInArray(state, action.index, action.newIndex, (state) => state)
);

const clearAllModifiers = () => [];

const editModifierOption = (state, action) => (
  updateItemInArray(state, action.index, (modifier) => ({
    ...modifier,
    options: {
      ...modifier.options,
      [action.name]: action.value,
    },
  }))
);

const editModifierError = (state, action) => (
  updateItemInArray(state, action.index, (modifier) => ({
    ...modifier,
    error: action.error,
  }))
);

const targetReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TARGET_MODIFIER:
      return { ...state, modifiers: addModifier(state.modifiers, action) };
    case REMOVE_TARGET_MODIFIER:
      return { ...state, modifiers: removeModifier(state.modifiers, action) };
    case MOVE_TARGET_MODIFIER:
      return { ...state, modifiers: moveModifier(state.modifiers, action) };
    case CLEAR_ALL_TARGET_MODIFIERS:
      return { ...state, modifiers: clearAllModifiers(state.modifiers, action) };
    case EDIT_TARGET_MODIFIER_OPTION:
      return { ...state, modifiers: editModifierOption(state.modifiers, action) };
    case EDIT_TARGET_MODIFIER_ERROR:
      return { ...state, modifiers: editModifierError(state.modifiers, action) };
    default:
      return state;
  }
};

export default targetReducer;
