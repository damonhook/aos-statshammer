import fetch from 'cross-fetch';
import { getUnits } from 'store/selectors/unitHelpers';
import { getTarget } from 'store/selectors/targetHelpers';
import { stats, notifications, modifiers, targetModifiers, simulations } from 'store/slices';
import { ISimulation } from 'types/simulations';
import { NUM_SIMULATIONS } from 'appConstants';
import { ThunkDispatch } from 'redux-thunk';
import { IStore, ITargetStore, IUnitStore } from 'types/store';
import { Action } from 'redux';

export const fetchStatsCompare = () => async (dispatch: ThunkDispatch<IStore, void, Action>) => {
  dispatch(stats.actions.fetchStatsPending());
  try {
    const units = getUnits();
    if (!units) dispatch(stats.actions.fetchStatsSuccess({ results: [] }));
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
    dispatch(stats.actions.fetchStatsSuccess({ results: res.results }));
  } catch (error) {
    dispatch(stats.actions.fetchStatsError({ error }));
    dispatch(
      notifications.actions.addNotification({
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

export const fetchModifiers = () => async (dispatch: ThunkDispatch<IStore, void, Action>) => {
  dispatch(modifiers.actions.fetchModifiersPending());
  try {
    const request = await fetch('/api/modifiers', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const res = await request.json();
    dispatch(modifiers.actions.fetchModifiersSuccess({ modifiers: res.modifiers }));
  } catch (error) {
    dispatch(modifiers.actions.fetchModifiersError({ error }));
    dispatch(
      notifications.actions.addNotification({
        message: 'Failed to fetch modifiers',
        variant: 'error',
        action: {
          label: 'Retry',
          onClick: () => dispatch(fetchModifiers()),
        },
      }),
    );
  }
};

export const fetchTargetModifiers = () => async (dispatch: ThunkDispatch<IStore, void, Action>) => {
  dispatch(targetModifiers.actions.fetchTargetModifiersPending());
  try {
    const request = await fetch('/api/target/modifiers', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const res = await request.json();
    dispatch(targetModifiers.actions.fetchTargetModifiersSuccess({ modifiers: res.modifiers }));
  } catch (error) {
    dispatch(targetModifiers.actions.fetchTargetModifiersError({ error }));
    dispatch(
      notifications.actions.addNotification({
        message: 'Failed to fetch target modifiers',
        variant: 'error',
        action: {
          label: 'Retry',
          onClick: () => dispatch(fetchTargetModifiers()),
        },
      }),
    );
  }
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

export const fetchSimulations = () => async (dispatch: ThunkDispatch<IStore, void, Action>) => {
  dispatch(simulations.actions.fetchSimulationsPending());
  try {
    const units = getUnits();
    if (!units) dispatch(simulations.actions.fetchSimulationsSuccess({ results: [], probabilities: [] }));
    const target = getTarget();
    const responses = await Promise.all(
      [2, 3, 4, 5, 6, 0].map(save =>
        fetchSimulationForSave(units, target, save, NUM_SIMULATIONS).then(data => data.json()),
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
