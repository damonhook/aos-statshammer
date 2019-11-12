export const FETCH_MODIFIERS_PENDING = "FETCH_MODIFIERS_PENDING";
export const FETCH_MODIFIERS_SUCCESS = "FETCH_MODIFIERS_SUCCESS";
export const FETCH_MODIFIERS_ERROR = "FETCH_MODIFIERS_ERROR";

export const fetch_modifiers_pending = () => ({
  type: FETCH_MODIFIERS_PENDING
})

export const fetch_modifiers_success = (modifiers) => ({
  type: FETCH_MODIFIERS_SUCCESS,
  payload: { modifiers }
})

export const fetch_modifiers_error = (error) => ({
  type: FETCH_MODIFIERS_ERROR,
  payload: { error }
})
