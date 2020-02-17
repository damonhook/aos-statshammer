import fetch from 'cross-fetch';
import store from 'store';
import { targetSelector, unitsSelector } from 'store/selectors';
import { notificationsStore, statsStore } from 'store/slices';

import { TDispatch } from './api.types';

export const fetchStatsCompare = () => async (dispatch: TDispatch) => {
  dispatch(statsStore.actions.fetchStatsPending());
  try {
    const state = store.getState();
    const units = unitsSelector(state);
    if (!units) dispatch(statsStore.actions.fetchStatsSuccess({ results: [] }));
    const target = targetSelector(state);
    const data = {
      units: units.map(unit => ({
        name: unit.uuid,
        weapon_profiles: unit.weapon_profiles.filter(profile => profile.active),
      })),
      target: {
        ...target,
        modifiers: target.modifiers.filter(({ error }) => !error),
      },
    };
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
        message: 'Failed to fetch stats',
        variant: 'error',
        action: {
          label: 'Retry',
          onClick: () => dispatch(fetchStatsCompare()),
        },
      }),
    );
  }
};
