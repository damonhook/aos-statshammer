import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import ModifierList from 'components/ModifierList';
import { withProvider } from './store';

const initialState = {
  modifiers: [
    {
      description: 'Reroll rolls for {characteristic}',
      id: 'reroll',
      name: 'Reroll',
      options: {
        characteristic: {
          items: [
            'to_hit',
            'to_wound',
          ],
          type: 'choice',
          value: '',
        },
      },
    },
  ],
};

storiesOf('Components/ModifierList', module)
  .addDecorator((story) => withProvider(story))
  .add('Basic', () => {
    const [modifiers, setModifiers] = useState(initialState.modifiers);
    return (
      <ModifierList
        modifiers={modifiers}
        setModifiers={setModifiers}
      />
    );
  });
