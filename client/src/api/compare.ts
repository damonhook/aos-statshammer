import fetch from 'cross-fetch';
import store from 'store';
import { getSanitizedTargetSelector, getSanitizedUnitsSelector } from 'store/selectors';
import { notificationsStore, statsStore } from 'store/slices';

import { TDispatch } from './api.types';

export const fetchStatsCompare = () => async (dispatch: TDispatch) => {
  dispatch(statsStore.actions.fetchStatsPending());
  try {
    const state = store.getState();
    const units = getSanitizedUnitsSelector(state)(true);
    const target = getSanitizedTargetSelector(state);
    if (!units) dispatch(statsStore.actions.fetchStatsSuccess({ results: [] }));
    const data = { units, target };
    const request = await fetch('/api/compare', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const res = await request.json();
    dispatch(statsStore.actions.fetchStatsSuccess({ results: res.results }));
  } catch (error) {
    dispatch(statsStore.actions.fetchStatsError({ error }));
    dispatch(
      notificationsStore.actions.addNotification({
        message: `${error}`,
        variant: 'error',
        action: {
          label: 'Retry',
          onClick: () => dispatch(fetchStatsCompare()),
        },
      }),
    );
  }
};
