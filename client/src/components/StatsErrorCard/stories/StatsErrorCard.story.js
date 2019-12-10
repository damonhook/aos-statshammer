import React from 'react';
import { storiesOf } from '@storybook/react';
import StatsErrorCard from 'components/StatsErrorCard';
import { withProvider } from 'utils/exampleStore';

storiesOf('Components/StatsErrorCard', module)
  .addDecorator(withProvider)
  .add('Basic', () => (
    <StatsErrorCard />
  ));
