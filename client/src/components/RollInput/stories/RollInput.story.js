import React from 'react';
import { storiesOf } from '@storybook/react';
import RollInput from 'components/RollInput';
import { boolean } from '@storybook/addon-knobs';

storiesOf('Components/RollInput', module)
  .add('Basic', () => (
    <RollInput label="test" required={boolean('Required', true)} />
  ));
