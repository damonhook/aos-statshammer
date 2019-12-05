import React from 'react';
import { storiesOf } from '@storybook/react';
import FloatingButton from 'components/FloatingButton';
import { Add } from '@material-ui/icons';
import { boolean } from '@storybook/addon-knobs';

storiesOf('Components/FloatingButton', module)
  .add('Add', () => (
    <FloatingButton onClick={() => { }} icon={<Add />} disabled={boolean('Disabled', false)} />
  ))

  .add('With Scroll', () => (
    <div style={{ height: '2000px', overflowY: 'scroll' }}>
      <FloatingButton onClick={() => { }} icon={<Add />} disabled={boolean('Disabled', false)} />
    </div>
  ));
