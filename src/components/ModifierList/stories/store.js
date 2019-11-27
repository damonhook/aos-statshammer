import React from 'react';
import { Provider } from 'react-redux';
import { createAppStore } from 'store';

const initialStore = {
  modifiers: {
    pending: false,
    error: null,
    modifiers: [
      {
        description: 'Add {bonus} to {characteristic}',
        id: 'bonus',
        name: 'Bonus',
        options: {
          bonus: {
            type: 'number',
          },
          characteristic: {
            items: [
              'attacks',
              'to_hit',
              'to_wound',
              'rend',
              'damage',
            ],
            type: 'choice',
          },
        },
      },
      {
        description: '{unmodified} rolls of {on} to {characteristic} result in {mortal_wounds} extra {in_addition}',
        id: 'mortal_wounds',
        name: 'Mortal Wounds',
        options: {
          characteristic: {
            items: [
              'to_hit',
            ],
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
        description: '{unmodified} rolls of {on} to {characteristic} result in {extra_hits} extra',
        id: 'exploding',
        name: 'Exploding',
        options: {
          characteristic: {
            items: [
              'to_hit',
            ],
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
        description: 'Reroll rolls to {characteristic}',
        id: 'reroll',
        name: 'Reroll',
        options: {
          characteristic: {
            items: [
              'to_hit',
              'to_wound',
            ],
            type: 'choice',
          },
        },
      },
      {
        description: 'Reroll Failed rolls to {characteristic}',
        id: 'reroll_failed',
        name: 'Reroll Failed',
        options: {
          characteristic: {
            items: [
              'to_hit',
              'to_wound',
            ],
            type: 'choice',
          },
        },
      },
      {
        description: 'Reroll Ones to {characteristic}',
        id: 'reroll_ones',
        name: 'Reroll Ones',
        options: {
          characteristic: {
            items: [
              'to_hit',
              'to_wound',
            ],
            type: 'choice',
          },
        },
      },
    ],
  },
};

export const store = createAppStore(initialStore);

export const withProvider = (story) => (
  <Provider store={store}>
    {story()}
  </Provider>
);
