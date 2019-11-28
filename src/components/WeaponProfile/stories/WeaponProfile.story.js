import React from 'react';
import { storiesOf } from '@storybook/react';
import WeaponProfile from 'components/WeaponProfile';
import { boolean } from '@storybook/addon-knobs';
import { Provider } from 'react-redux';
import store from 'store';

const withProvider = (story) => (
  <Provider store={store}>
    {story()}
  </Provider>
);

storiesOf('Components/WeaponProfile', module)
  .addDecorator(withProvider)
  .add('basic', () => {
    const active = boolean('Active', true);
    const profile = {
      active,
      num_models: 20,
      to_hit: 3,
      to_wound: 3,
      rend: 1,
      damage: 2,
      modifiers: [],
    };
    return (
      <WeaponProfile unit_id={0} id={0} profile={profile} />
    );
  })
  .add('With Modifiers', () => {
    const active = boolean('Active', true);
    const profile = {
      active,
      num_models: 20,
      to_hit: 3,
      to_wound: 3,
      rend: 1,
      damage: 2,
      modifiers: [
        {
          description: 'Reroll Ones for {characteristic}',
          id: 'reroll_ones',
          name: 'Reroll Ones',
          options: {
            characteristic: {
              value: 'to_hit',
            },
          },
        },
        {
          description: 'Add {bonus} for {characteristic}',
          id: 'bonus',
          name: 'Bonus',
          options: {
            characteristic: {
              value: 'to_wound',
            },
            bonus: {
              value: 1,
            },
          },
        },
      ],
    };
    return (
      <WeaponProfile unit_id={0} id={0} profile={profile} />
    );
  });
