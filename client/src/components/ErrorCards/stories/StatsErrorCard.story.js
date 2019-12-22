import React from 'react';
import { storiesOf } from '@storybook/react';
import { StatsErrorCard } from 'components/ErrorCards';
import { withProvider } from 'utils/exampleStore';

storiesOf('Components/StatsErrorCard', module)
  .addDecorator(withProvider)
  .add('Basic', () => (
    <StatsErrorCard />
  ));
