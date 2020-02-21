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

import { unit1, unit2, unit3 } from './testUnits';

export const modifiers: IModifiersStore = {
  pending: false,
  error: false,
  items: [
    {
      id: 'REROLL_ONES',
      name: 'Reroll Ones',
      description: 'Reroll Ones for {characteristic}',
      options: {
        characteristic: {
          type: 'choice',
          items: ['to_hit', 'to_wound'],
        },
      },
    },
    {
      id: 'REROLL_FAILED',
      name: 'Reroll Failed',
      description: 'Reroll Failed rolls for {characteristic}',
      options: {
        characteristic: {
          type: 'choice',
          items: ['to_hit', 'to_wound'],
        },
      },
    },
    {
      id: 'REROLL',
      name: 'Reroll',
      description: 'Reroll rolls for {characteristic}',
      options: {
        characteristic: {
          type: 'choice',
          items: ['to_hit', 'to_wound'],
        },
      },
    },
  ],
};

export const targetModifiers: ITargetModifiersStore = {
  pending: false,
  error: false,
  items: [
    {
      id: 'TARGET_REROLL',
      name: 'Target Reroll',
      description: 'Reroll Save Rolls',
      options: {},
    },
    {
      id: 'TARGET_REROLL_FAILED',
      name: 'Target Reroll Failed',
      description: 'Reroll Failed Save Rolls',
      options: {},
    },
    {
      id: 'TARGET_REROLL_ONES',
      name: 'Target Reroll Ones',
      description: 'Reroll Save Rolls of One',
      options: {},
    },
    {
      id: 'TARGET_FNP',
      name: 'Target Feel No Pain',
      description: 'Ignore wounds and mortal wounds on a roll of {on}+',
      options: {
        on: {
          type: 'roll',
          allowOnes: false,
          default: 6,
        },
      },
    },
  ],
};

export const units: IUnitStore = [unit1, unit2, unit3];

export const target: ITargetStore = {
  modifiers: [
    {
      id: 'TARGET_REROLL',
      uuid: '0',
      active: true,
      error: false,
      options: {},
    },
    {
      id: 'TARGET_REROLL_FAILED',
      uuid: '1',
      active: false,
      error: false,
      options: {},
    },
    {
      id: 'TARGET_REROLL_ONES',
      uuid: '2',
      active: true,
      error: true,
      options: {
        characteristic: 'to_hit',
        bonus: 1,
      },
    },
    {
      id: 'TARGET_FNP',
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
