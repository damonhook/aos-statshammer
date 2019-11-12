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


export const FETCH_STATS_PENDING = "FETCH_STATS_PENDING";
export const FETCH_STATS_SUCCESS = "FETCH_STATS_SUCCESS";
export const FETCH_STATS_ERROR = "FETCH_STATS_ERROR";

export const fetch_stats_pending = () => ({
  type: FETCH_STATS_PENDING
})

export const fetch_stats_success = (payload) => ({
  type: FETCH_STATS_SUCCESS,
  payload: payload
})

export const fetch_stats_error = (error) => ({
  type: FETCH_STATS_ERROR,
  payload: { error }
})
