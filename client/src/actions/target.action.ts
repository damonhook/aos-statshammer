export const ADD_TARGET_MODIFIER = 'ADD_TARGET_MODIFIER';
export const REMOVE_TARGET_MODIFIER = 'REMOVE_TARGET_MODIFIER';
export const MOVE_TARGET_MODIFIER = 'MOVE_TARGET_MODIFIER';
export const CLEAR_ALL_TARGET_MODIFIERS = 'CLEAR_ALL_TARGET_MODIFIERS';
export const EDIT_TARGET_MODIFIER_OPTION = 'EDIT_TARGET_MODIFIER_OPTION';
export const EDIT_TARGET_MODIFIER_ERROR = 'EDIT_TARGET_MODIFIER_ERROR';

export const addTargetModifier = modifier => ({
  type: ADD_TARGET_MODIFIER,
  modifier,
});

export const removeTargetModifier = index => ({
  type: REMOVE_TARGET_MODIFIER,
  index,
});

export const moveTargetModifier = (index, newIndex) => ({
  type: MOVE_TARGET_MODIFIER,
  index,
  newIndex,
});

export const clearAllTargetModifiers = () => ({
  type: CLEAR_ALL_TARGET_MODIFIERS,
});

export const editTargetModifierOption = (index, name, value) => ({
  type: EDIT_TARGET_MODIFIER_OPTION,
  index,
  name,
  value,
});

export const editTargetModifierError = (index, error) => ({
  type: EDIT_TARGET_MODIFIER_ERROR,
  index,
  error,
});
