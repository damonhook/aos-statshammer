import React from 'react';
import { storiesOf } from '@storybook/react';
import Drawer from 'components/Drawer';
import { select, boolean } from '@storybook/addon-knobs';
import Container from 'utils/Container';
import { EPages } from 'types/routes';

storiesOf('Components/Drawer', module).add('Basic', () => (
  <Container>
    <Drawer open={boolean('Open', true)} page={select('Page', EPages, EPages.HOME)} />
  </Container>
));
