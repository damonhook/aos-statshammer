import React from 'react';
import { Provider } from 'react-redux';
import { configureSampleStore } from 'store/configureStore';

const units = [
  {
    name: 'Unit 1',
    uuid: 'unit-1',
    weapon_profiles: [
      {
        uuid: 'profile-1',
        active: true,
        num_models: 20,
        attacks: 2,
        to_hit: 3,
        to_wound: 3,
        rend: 1,
        damage: 2,
        modifiers: [],
      },
    ],
  },
  {
    name: 'Unit 2',
    uuid: 'unit-2',
    weapon_profiles: [
      {
        uuid: 'profile-2',
        active: true,
        num_models: 20,
        attacks: 2,
        to_hit: 3,
        to_wound: 3,
        rend: 0,
        damage: 1,
        modifiers: [
          {
            id: 'mortal_wounds',
            options: {
              characteristic: 'to_hit',
              on: 6,
              mortal_wounds: 2,
              unmodified: true,
              in_addition: true,
            },
          },
        ],
      },
    ],
  },
];

const stats = {
  pending: false,
  error: null,
  payload: [
    {
      'Unit 1': 5.93,
      'Unit 2': 16.3,
      save: '1',
    },
    {
      'Unit 1': 11.85,
      'Unit 2': 16.3,
      save: '2',
    },
    {
      'Unit 1': 17.78,
      'Unit 2': 19.26,
      save: '3',
    },
    {
      'Unit 1': 23.7,
      'Unit 2': 22.22,
      save: '4',
    },
    {
      'Unit 1': 29.63,
      'Unit 2': 25.19,
      save: '5',
    },
    {
      'Unit 1': 35.56,
      'Unit 2': 28.15,
      save: '6',
    },
    {
      'Unit 1': 35.56,
      'Unit 2': 31.11,
      save: 'None',
    },
  ],
};

const modifiers = {
  pending: false,
  error: null,
  modifiers: [
    {
      description: 'Add {bonus} for {characteristic}',
      id: 'bonus',
      name: 'Bonus',
      options: {
        bonus: {
          type: 'number',
        },
        characteristic: {
          items: ['attacks', 'to_hit', 'to_wound', 'rend', 'damage'],
          type: 'choice',
        },
      },
    },
    {
      description:
        '{unmodified} rolls of {on} for {characteristic} result in {mortal_wounds} extra {in_addition}',
      id: 'mortal_wounds',
      name: 'Mortal Wounds',
      options: {
        characteristic: {
          items: ['to_hit'],
          type: 'choice',
        },
        in_addition: {
          type: 'boolean',
        },
        mortal_wounds: {
          type: 'number',
        },
        on: {
          type: 'number',
        },
        unmodified: {
          type: 'boolean',
        },
      },
    },
    {
      description: '{unmodified} rolls of {on} for {characteristic} result in {extra_hits} extra',
      id: 'exploding',
      name: 'Exploding',
      options: {
        characteristic: {
          items: ['to_hit'],
          type: 'choice',
        },
        extra_hits: {
          type: 'number',
        },
        on: {
          type: 'number',
        },
        unmodified: {
          type: 'boolean',
        },
      },
    },
    {
      description: 'Reroll rolls for {characteristic}',
      id: 'reroll',
      name: 'Reroll',
      options: {
        characteristic: {
          items: ['to_hit', 'to_wound'],
          type: 'choice',
        },
      },
    },
    {
      description: 'Reroll Failed rolls for {characteristic}',
      id: 'reroll_failed',
      name: 'Reroll Failed',
      options: {
        characteristic: {
          items: ['to_hit', 'to_wound'],
          type: 'choice',
        },
      },
    },
    {
      description: 'Reroll Ones for {characteristic}',
      id: 'reroll_ones',
      name: 'Reroll Ones',
      options: {
        characteristic: {
          items: ['to_hit', 'to_wound'],
          type: 'choice',
        },
      },
    },
  ],
};

const notifications = [];

const config = {
  darkMode: false,
};

export const initialState = {
  units,
  stats,
  modifiers,
  notifications,
  config,
};

export const store = configureSampleStore(initialState);

export const withProvider = story => <Provider store={store}>{story()}</Provider>;

export { store as default };
