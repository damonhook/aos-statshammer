import fetch from 'cross-fetch';
import { addNotification } from 'actions/notifications.action';
import { getUnits } from 'utils/unitHelpers';
import { getTarget } from 'utils/targetHelpers';
import { fetchStatsPending, fetchStatsSuccess, fetchStatsError } from './actions/stats.action';
import {
  fetchModifiersPending,
  fetchModifiersSuccess,
  fetchModifiersError,
} from './actions/modifiers.action';
import {
  fetchTargetModifiersPending,
  fetchTargetModifiersSuccess,
  fetchTargetModifiersError,
} from './actions/targetModifiers.action';
import {
  fetchSimulationsPending,
  fetchSimulationsSuccess,
  fetchSimulationsError,
} from './actions/simulations.action';

export const fetchStatsCompare = () => async dispatch => {
  dispatch(fetchStatsPending());
  try {
    const units = getUnits();
    if (!units) dispatch(fetchStatsSuccess([]));
    const target = getTarget();
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
    dispatch(fetchStatsSuccess(res.results));
  } catch (error) {
    dispatch(fetchStatsError(error));
    dispatch(addNotification({ message: 'Failed to fetch stats', variant: 'error' }));
  }
};

export const fetchModifiers = () => async dispatch => {
  dispatch(fetchModifiersPending());
  try {
    const request = await fetch('/api/modifiers', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const res = await request.json();
    dispatch(fetchModifiersSuccess(res.modifiers));
  } catch (error) {
    dispatch(fetchModifiersError(error));
    dispatch(addNotification({ message: 'Failed to fetch modifiers', variant: 'error' }));
  }
};

export const fetchTargetModifiers = () => async dispatch => {
  dispatch(fetchTargetModifiersPending());
  try {
    const request = await fetch('/api/target/modifiers', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const res = await request.json();
    dispatch(fetchTargetModifiersSuccess(res.modifiers));
  } catch (error) {
    dispatch(fetchTargetModifiersError(error));
    dispatch(addNotification({ message: 'Failed to fetch modifiers', variant: 'error' }));
  }
};

const fetchSimulationForSave = async (units, target, save, numSimulations) => {
  const data = {
    units: units.map(unit => ({
      name: unit.uuid,
      weapon_profiles: unit.weapon_profiles.filter(profile => profile.active),
    })),
    target: {
      ...target,
      modifiers: target.modifiers.filter(({ error }) => !error),
    },
    numSimulations,
    save,
  };
  return fetch('/api/simulate/save', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const fetchSimulations = () => async dispatch => {
  dispatch(fetchSimulationsPending());
  try {
    const units = getUnits();
    if (!units) dispatch(fetchSimulationsSuccess([], []));
    const target = getTarget();
    const responses = await Promise.all(
      [2, 3, 4, 5, 6, 0].map(save =>
        fetchSimulationForSave(units, target, save, 5000).then(data => data.json()),
      ),
    );
    const res = responses.reduce(
      (acc, { results, probabilities }) => ({
        results: [...acc.results, results],
        probabilities: [...acc.probabilities, probabilities],
      }),
      { results: [], probabilities: [] },
    );
    dispatch(fetchSimulationsSuccess(res.results, res.probabilities));
  } catch (error) {
    dispatch(fetchSimulationsError(error));
    dispatch(addNotification({ message: 'Failed to fetch simulations', variant: 'error' }));
  }
};
