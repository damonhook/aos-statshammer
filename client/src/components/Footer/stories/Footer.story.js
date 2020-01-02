import React from 'react';
import { storiesOf } from '@storybook/react';
import Footer from 'components/Footer';
import Container from 'utils/Container';

storiesOf('Components/Footer', module)
  .add('Basic', () => (
    <Container disablePadding>
      <div style={{ flex: 1 }} />
      <Footer />
    </Container>
  ));
