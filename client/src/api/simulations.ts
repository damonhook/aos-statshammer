import fetch from 'cross-fetch';
import { getUnits } from 'store/selectors/unitHelpers';
import { getTarget } from 'store/selectors/targetHelpers';
import { notifications, simulations } from 'store/slices';
import { ISimulation } from 'types/simulations';
import { ITargetStore, IUnitStore } from 'types/store';
import store from 'store';
import appConfig from 'appConfig';
import { TDispatch } from './api.types';

const getNumSimulations = (): number => {
  const numSims = store.getState().config.numSimulations ?? appConfig.simulations.default;
  return Math.min(Math.max(numSims, appConfig.simulations.min), appConfig.simulations.max);
};

const fetchSimulationForSave = async (
  units: IUnitStore,
  target: ITargetStore,
  save: number,
  numSimulations: number,
) => {
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

export const fetchSimulations = () => async (dispatch: TDispatch) => {
  dispatch(simulations.actions.fetchSimulationsPending());
  try {
    const units = getUnits();
    if (!units) dispatch(simulations.actions.fetchSimulationsSuccess({ results: [], probabilities: [] }));
    const target = getTarget();
    const numSimulations = getNumSimulations();

    const responses = await Promise.all(
      [2, 3, 4, 5, 6, 0].map(save =>
        fetchSimulationForSave(units, target, save, numSimulations).then(data => data.json()),
      ),
    );

    const res: ISimulation = responses.reduce(
      (acc, { results, probabilities }) => ({
        results: [...acc.results, results],
        probabilities: [...acc.probabilities, probabilities],
      }),
      { results: [], probabilities: [] },
    );

    dispatch(
      simulations.actions.fetchSimulationsSuccess({ results: res.results, probabilities: res.probabilities }),
    );
  } catch (error) {
    dispatch(simulations.actions.fetchSimulationsError({ error }));
    dispatch(
      notifications.actions.addNotification({
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
