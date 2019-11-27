import React from 'react';
import { storiesOf } from '@storybook/react';
import ModifierItem from 'components/ModifierList/ModifierItem';

storiesOf('Components/ModifierList/ModifierItem', module)
  .add('basic', (state, setState) => {
    const options = {
      characteristic: {
        items: [
          'to_hit',
          'to_wound',
        ],
        type: 'choice',
        value: state.characteristic,
      },
    };
    const onOptionChange = (index, name, newVal) => { setState({ name: newVal }); };
    return (
      <ModifierItem
        index={0}
        name="Reroll"
        description="Reroll rolls to {characteristic}"
        options={options}
        removeModifier={() => {}}
        onOptionChange={onOptionChange}
      />
    );
  })
  .add('advanced', (state, setState) => {
    const options = {
      characteristic: {
        items: [
          'to_hit',
          'to_wound',
        ],
        type: 'choice',
        value: state.characteristic,
      },
      extra_hits: {
        type: 'number',
        value: state.extra_hits,
      },
      on: {
        type: 'number',
        value: state.on,
      },
      unmodified: {
        type: 'boolean',
        value: state.unmodified,
      },
    };
    const onOptionChange = (index, name, newVal) => { setState({ name: newVal }); };
    return (
      <ModifierItem
        index={0}
        name="Exploding"
        description="{unmodified} rolls of {on} to {characteristic} result in {extra_hits} extra"
        options={options}
        removeModifier={() => {}}
        onOptionChange={onOptionChange}
      />
    );
  });
