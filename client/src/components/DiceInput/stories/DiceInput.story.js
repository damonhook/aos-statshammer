import React from 'react';
import { storiesOf } from '@storybook/react';
import DiceInput from 'components/DiceInput';

storiesOf('Components/DiceInput', module)
  .add('Basic', () => (
    <DiceInput label="test" />
  ));
