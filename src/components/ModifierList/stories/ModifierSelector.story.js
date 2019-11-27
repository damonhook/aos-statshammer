import React from 'react';
import { storiesOf } from '@storybook/react';
import ModifierSelector from 'components/ModifierList/ModifierSelector';
import { withProvider } from './store';

storiesOf('Components/ModifierList/ModifierSelector', module)
  .addDecorator((story) => withProvider(story))
  .add('basic', () => (
    <ModifierSelector
      onClick={() => {}}
    />
  ));
