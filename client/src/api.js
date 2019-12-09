import fetch from 'cross-fetch';
import { fetchStatsPending, fetchStatsSuccess, fetchStatsError } from './actions/stats.action';
import { fetchModifiersPending, fetchModifiersSuccess, fetchModifiersError } from './actions/modifiers.action';

export const fetchStatsCompare = (units) => (dispatch) => {
  dispatch(fetchStatsPending());
  const data = {
    units: units.map((unit) => ({
      name: unit.uuid,
      weapon_profiles: unit.weapon_profiles.filter((profile) => profile.active),
    })),
  };
  fetch('/api/compare', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw (res.error);
      }
      dispatch(fetchStatsSuccess(res.results));
      return res.results;
    })
    .catch((error) => {
      dispatch(fetchStatsError(error));
      console.error(error);
    });
};


export const fetchModifiers = () => (dispatch) => {
  dispatch(fetchModifiersPending());
  fetch('/api/modifiers', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw (res.error);
      }
      dispatch(fetchModifiersSuccess(res.modifiers));
      return res.modifiers;
    })
    .catch((error) => {
      dispatch(fetchModifiersError(error));
    });
};
