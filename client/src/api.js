import fetch from 'cross-fetch';
import { addNotification } from 'actions/notifications.action';
import { getUnits } from 'utils/unitHelpers';
import { fetchStatsPending, fetchStatsSuccess, fetchStatsError } from './actions/stats.action';
import { fetchModifiersPending, fetchModifiersSuccess, fetchModifiersError } from './actions/modifiers.action';
import {
  fetchSimulationsPending, fetchSimulationsSuccess, fetchSimulationsError,
} from './actions/simulations.action';

export const fetchStatsCompare = () => async (dispatch) => {
  dispatch(fetchStatsPending());
  try {
    const units = getUnits();
    if (!units) dispatch(fetchStatsSuccess([]));
    const data = {
      units: units.map((unit) => ({
        name: unit.uuid,
        weapon_profiles: unit.weapon_profiles.filter((profile) => profile.active),
      })),
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

export const fetchModifiers = () => async (dispatch) => {
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

export const fetchSimulations = () => async (dispatch) => {
  dispatch(fetchSimulationsPending());
  try {
    const units = getUnits();
    if (!units) dispatch(fetchSimulationsSuccess([]));
    const data = {
      units: units.map((unit) => ({
        name: unit.uuid,
        weapon_profiles: unit.weapon_profiles.filter((profile) => profile.active),
      })),
      numSimulations: 3000,
    };
    const request = await fetch('/api/simulate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const res = await request.json();
    dispatch(fetchSimulationsSuccess(res.results, res.probabilities));
  } catch (error) {
    dispatch(fetchSimulationsError(error));
    dispatch(addNotification({ message: 'Failed to fetch simulations', variant: 'error' }));
  }
};
