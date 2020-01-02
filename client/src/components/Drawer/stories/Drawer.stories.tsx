import React from 'react';
import { storiesOf } from '@storybook/react';
import Drawer from 'components/Drawer';
import { select, boolean } from '@storybook/addon-knobs';
import Container from 'utils/Container';

storiesOf('Components/Drawer', module).add('Basic', () => (
  <Container>
    <Drawer open={boolean('Open', true)} page={select('Page', ['home', 'advanced'], 'home')} />
  </Container>
));
