import React from 'react';
import { storiesOf } from '@storybook/react';
import ModifierSelector from 'components/ModifierSelector';
import { withProvider } from './store';

storiesOf('Components/ModifierSelector', module)
  .addDecorator((story) => withProvider(story))
  .add('basic', () => (
    <ModifierSelector
      onClick={() => {}}
    />
  ));
