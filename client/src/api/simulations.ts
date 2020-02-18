import appConfig from 'appConfig';
import fetch from 'cross-fetch';
import store from 'store';
import { getSanitizedTargetSelector, getSanitizedUnitsSelector, ISanitizedUnit } from 'store/selectors';
import { configStore, notificationsStore, simulationsStore } from 'store/slices';
import { ISimulation } from 'types/simulations';
import { ITargetStore } from 'types/store';

import { TDispatch } from './api.types';

const verifyNumSimulations = (dispatch: TDispatch): number => {
  const storeNumSims = store.getState().config.numSimulations;
  let numSims = storeNumSims ?? appConfig.simulations.default;
  numSims = Math.min(Math.max(numSims, appConfig.simulations.min), appConfig.simulations.max);
  if (numSims !== storeNumSims) {
    dispatch(configStore.actions.changeNumSimulations({ newValue: numSims }));
  }
  return numSims;
};

const fetchSimulationForSave = async (
  units: ISanitizedUnit[],
  target: ITargetStore,
  save: number,
  numSimulations: number,
) => {
  const data = {
    units: units.map(unit => ({
      name: unit.name,
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

export const fetchSimulations = () => async (dispatch: TDispatch) => {
  dispatch(simulationsStore.actions.fetchSimulationsPending());
  try {
    const state = store.getState();
    const units = getSanitizedUnitsSelector(state)(false);
    if (!units)
      dispatch(simulationsStore.actions.fetchSimulationsSuccess({ results: [], probabilities: [] }));
    const target = getSanitizedTargetSelector(state);
    const numSimulations = verifyNumSimulations(dispatch);

    const responses = await Promise.all(
      [2, 3, 4, 5, 6, 0].map(save =>
        fetchSimulationForSave(units, target, save, numSimulations).then(data => data.json()),
      ),
    );

    const res: ISimulation = responses.reduce(
      (acc, { results }) => ({
        results: [...acc.results, results],
      }),
      { results: [] },
    );

    dispatch(simulationsStore.actions.fetchSimulationsSuccess({ results: res.results }));
  } catch (error) {
    dispatch(simulationsStore.actions.fetchSimulationsError({ error }));
    dispatch(
      notificationsStore.actions.addNotification({
        message: 'Failed to fetch simulations',
        variant: 'error',
        action: {
          label: 'Retry',
          onClick: () => dispatch(fetchSimulations()),
        },
      }),
    );
  }
};
