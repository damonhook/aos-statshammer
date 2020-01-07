import React from 'react';
import { storiesOf } from '@storybook/react';
import ErrorCard from 'components/ErrorCards';
import { action } from '@storybook/addon-actions';
import Container from 'utils/Container';

storiesOf('Components/ErrorCard', module).add('Basic', () => (
  <Container variant="paper">
    <div style={{ height: '20rem', padding: '2em 5em 2em 2em' }}>
      <ErrorCard retryFunc={action('retry-clicked')} />
    </div>
  </Container>
));
