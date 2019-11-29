import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import ModifierItem from 'components/ModifierItem';

const onOptionChangeFactory = (options, setOptions) => (index, name, newVal) => {
  setOptions({
    ...options,
    [name]: {
      ...options[name],
      value: newVal,
    },
  });
};

storiesOf('Components/ModifierItem', module)
  .add('Basic', () => {
    const [options, setOptions] = useState({
      characteristic: {
        items: [
          'to_hit',
          'to_wound',
        ],
        type: 'choice',
        value: null,
      },
    });
    const onOptionChange = onOptionChangeFactory(options, setOptions);
    return (
      <ModifierItem
        index={0}
        name="Reroll"
        description="Reroll rolls for {characteristic}"
        options={options}
        removeModifier={() => { }}
        onOptionChange={onOptionChange}
      />
    );
  })

  .add('Advanced', () => {
    const [options, setOptions] = useState({
      characteristic: {
        items: [
          'to_hit',
          'to_wound',
        ],
        type: 'choice',
        value: null,
      },
      extra_hits: {
        type: 'number',
        value: null,
      },
      on: {
        type: 'number',
        value: null,
      },
      unmodified: {
        type: 'boolean',
        value: null,
      },
    });

    const onOptionChange = onOptionChangeFactory(options, setOptions);
    return (
      <ModifierItem
        index={0}
        name="Exploding"
        description="{unmodified} rolls of {on} for {characteristic} result in {extra_hits} extra"
        options={options}
        removeModifier={() => { }}
        onOptionChange={onOptionChange}
      />
    );
  })

  .add('Filled', () => {
    const [options, setOptions] = useState({
      characteristic: {
        items: [
          'to_hit',
          'to_wound',
        ],
        type: 'choice',
        value: 'to_hit',
      },
      extra_hits: {
        type: 'number',
        value: 1,
      },
      on: {
        type: 'number',
        value: 6,
      },
      unmodified: {
        type: 'boolean',
        value: true,
      },
    });

    const onOptionChange = onOptionChangeFactory(options, setOptions);
    return (
      <ModifierItem
        index={0}
        name="Exploding"
        description="{unmodified} rolls of {on} for {characteristic} result in {extra_hits} extra"
        options={options}
        removeModifier={() => { }}
        onOptionChange={onOptionChange}
      />
    );
  });
