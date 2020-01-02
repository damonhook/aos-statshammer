export const FETCH_TARGET_MODIFIERS_PENDING = 'FETCH_TARGET_MODIFIERS_PENDING';
export const FETCH_TARGET_MODIFIERS_SUCCESS = 'FETCH_TARGET_MODIFIERS_SUCCESS';
export const FETCH_TARGET_MODIFIERS_ERROR = 'FETCH_TARGET_MODIFIERS_ERROR';

export const fetchTargetModifiersPending = () => ({
  type: FETCH_TARGET_MODIFIERS_PENDING,
});

export const fetchTargetModifiersSuccess = modifiers => ({
  type: FETCH_TARGET_MODIFIERS_SUCCESS,
  modifiers,
});

export const fetchTargetModifiersError = error => ({
  type: FETCH_TARGET_MODIFIERS_ERROR,
  error,
});
