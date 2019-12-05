import React from 'react';
import { storiesOf } from '@storybook/react';
import ModifierOption from 'components/ModifierSelector/ModifierOption';

storiesOf('Components/ModifierSelector', module)
  .add('Option', () => {
    const modifier = {
      id: 'reroll',
      name: 'Reroll',
      description: 'Reroll rolls for {characteristic}',
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
