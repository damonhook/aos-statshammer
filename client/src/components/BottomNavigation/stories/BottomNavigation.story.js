import React from 'react';
import { storiesOf } from '@storybook/react';
import BottomNavigation from 'components/BottomNavigation';
import { boolean } from '@storybook/addon-knobs';
import ScrollContainer from 'utils/ScrollContainer';

storiesOf('Components/BottomNavigation', module)
  .add('Basic', () => (
    <BottomNavigation
      activeIndex={0}
      numUnits={boolean('Advanced Disabled', false) ? 0 : 1}
    />
  ))

  .add('With Scroll', () => (
    <ScrollContainer>
      <BottomNavigation
        activeIndex={0}
        numUnits={boolean('Advanced Disabled', false) ? 0 : 1}
      />
    </ScrollContainer>
  ));
