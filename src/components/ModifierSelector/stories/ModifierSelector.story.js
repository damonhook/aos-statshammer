import React from 'react';
import { storiesOf } from '@storybook/react';
import ModifierSelector from 'components/ModifierSelector';
import { withProvider } from 'utils/exampleStore';

storiesOf('Components/ModifierSelector', module)
  .addDecorator((story) => withProvider(story))
  .add('Selector', () => (
    <ModifierSelector
      onClick={() => {}}
    />
  ));
