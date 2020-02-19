import {
  IConfigStore,
  IModifiersStore,
  INotificationsStore,
  ISimulationsStore,
  IStatsStore,
  IStore,
  ITargetModifiersStore,
  ITargetStore,
  IUnitStore,
} from 'types/store';

export const modifiers: IModifiersStore = {
  pending: false,
  error: false,
  items: [],
};

export const targetModifiers: ITargetModifiersStore = {
  pending: false,
  error: false,
  items: [],
};

export const units: IUnitStore = [];

export const target: ITargetStore = {
  modifiers: [
    {
      id: 'MOD_ID_0',
      uuid: '0',
      active: true,
      error: false,
      options: {
        characteristic: 'to_hit',
      },
    },
    {
      id: 'MOD_ID_1',
      uuid: '1',
      active: false,
      error: false,
      options: {
        characteristic: 'to_hit',
        bonus: 1,
      },
    },
    {
      id: 'MOD_ID_2',
      uuid: '2',
      active: true,
      error: true,
      options: {},
    },
    {
      id: 'MOD_ID_3',
      uuid: '3',
      active: false,
      error: true,
      options: {
        characteristic: 'to_wound',
      },
    },
  ],
};

export const stats: IStatsStore = {
  pending: false,
  error: false,
  payload: [],
};

export const simulations: ISimulationsStore = {
  pending: false,
  error: false,
  results: [],
};

export const notifications: INotificationsStore = [];

export const config: IConfigStore = {
  darkMode: false,
  desktopGraphList: false,
  numSimulations: 5000,
};

export const state: IStore = {
  modifiers,
  targetModifiers,
  units,
  target,
  stats,
  simulations,
  notifications,
  config,
};
