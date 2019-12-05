export const FETCH_STATS_PENDING = 'FETCH_STATS_PENDING';
export const FETCH_STATS_SUCCESS = 'FETCH_STATS_SUCCESS';
export const FETCH_STATS_ERROR = 'FETCH_STATS_ERROR';

export const fetchStatsPending = () => ({
  type: FETCH_STATS_PENDING,
});

export const fetchStatsSuccess = (payload) => ({
  type: FETCH_STATS_SUCCESS,
  payload,
});

export const fetchStatsError = (error) => ({
  type: FETCH_STATS_ERROR,
  payload: { error },
});
