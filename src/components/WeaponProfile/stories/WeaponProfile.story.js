import React from 'react';
import { storiesOf } from '@storybook/react';
import WeaponProfile from 'components/WeaponProfile';
import { boolean, number } from '@storybook/addon-knobs';
import { withProvider } from 'utils/exampleStore';


storiesOf('Components/WeaponProfile', module)
  .addDecorator(withProvider)
  .add('Basic', () => {
    const profile = {
      active: boolean('Active', true),
      num_models: number('Number of models', 20),
      attacks: number('Attacks', 2),
      to_hit: number('To Hit', 3),
      to_wound: number('To Wound', 3),
      rend: number('Rend', 1),
      damage: number('Damage', 2),
      modifiers: [],
    };
    return (
      <WeaponProfile unit_id={0} id={0} profile={profile} />
    );
  })
  .add('With Modifiers', () => {
    const profile = {
      active: boolean('Active', true),
      num_models: number('Number of models', 20),
      attacks: number('Attacks', 2),
      to_hit: number('To Hit', 3),
      to_wound: number('To Wound', 3),
      rend: number('Rend', 1),
      damage: number('Damage', 2),
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
