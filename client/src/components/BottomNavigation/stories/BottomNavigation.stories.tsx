import React from 'react';
import { storiesOf } from '@storybook/react';
import BottomNavigation from 'components/BottomNavigation';
import { boolean } from '@storybook/addon-knobs';
import ScrollContainer from 'utils/ScrollContainer';
import Container from 'utils/Container';

storiesOf('Components/BottomNavigation', module)
  .add('Basic', () => {
    return (
      <Container fullHeight>
        <BottomNavigation />
      </Container>
    );
  })

  .add('With Scroll', () => (
    <ScrollContainer>
      <BottomNavigation />
    </ScrollContainer>
  ));
