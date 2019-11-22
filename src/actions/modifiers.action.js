export const FETCH_MODIFIERS_PENDING = 'FETCH_MODIFIERS_PENDING';
export const FETCH_MODIFIERS_SUCCESS = 'FETCH_MODIFIERS_SUCCESS';
export const FETCH_MODIFIERS_ERROR = 'FETCH_MODIFIERS_ERROR';

export const fetchModifiersPending = () => ({
  type: FETCH_MODIFIERS_PENDING,
});

export const fetchModifiersSuccess = (modifiers) => ({
  type: FETCH_MODIFIERS_SUCCESS,
  payload: { modifiers },
});

export const fetchModifiersError = (error) => ({
  type: FETCH_MODIFIERS_ERROR,
  payload: { error },
});
