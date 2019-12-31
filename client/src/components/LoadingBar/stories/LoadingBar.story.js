import React from 'react';
import { storiesOf } from '@storybook/react';
import LoadingBar from 'components/LoadingBar';
import Container from 'utils/Container';

storiesOf('Components/LoadingBar', module)
  .add('Basic', () => (
    <Container>
      <div style={{ padding: '20px' }}>
        <Container variant="paper" disablePadding fullHeight={false}>
          <LoadingBar />
        </Container>
      </div>
    </Container>
  ));
