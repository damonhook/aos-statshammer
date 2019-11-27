import React from 'react';
import { storiesOf } from '@storybook/react';
import ModifierOption from 'components/ModifierList/ModifierOption';

storiesOf('Components/ModifierList/ModifierOption', module)
  .add('basic', () => {
    const modifier = {
      id: 'reroll',
      name: 'Reroll',
      description: 'Reroll rolls to {characteristic}',
      options: {
        characteristic: {
          items: [
            'to_hit',
            'to_wound',
          ],
          type: 'choice',
        },
      },
    };
    return (
      <ModifierOption
        modifier={modifier}
        onClick={() => { }}
      />
    );
  });
