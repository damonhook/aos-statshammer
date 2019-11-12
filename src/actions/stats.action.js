export const FETCH_TABLE_PENDING = "FETCH_TABLE_PENDING";
export const FETCH_TABLE_SUCCESS = "FETCH_TABLE_SUCCESS";
export const FETCH_TABLE_ERROR = "FETCH_TABLE_ERROR";

export const fetch_table_pending = () => ({
  type: FETCH_TABLE_PENDING
})

export const fetch_table_success = (payload) => ({
  type: FETCH_TABLE_SUCCESS,
  payload: payload
})

export const fetch_table_error = (error) => ({
  type: FETCH_TABLE_ERROR,
  payload: { error }
})
