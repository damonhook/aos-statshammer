import React from 'react';
import { storiesOf } from '@storybook/react';
import AppBar from 'components/AppBar';
import { text } from '@storybook/addon-knobs';

storiesOf('Components/AppBar', module)
  .add('Basic', () => (
    <AppBar title={text('Title', 'Title')} />
  ));
