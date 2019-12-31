import React from 'react';
import { storiesOf } from '@storybook/react';
import ErrorCard, { StatsErrorCard, AdvancedStatsErrorCard } from 'components/ErrorCards';
import { action } from '@storybook/addon-actions';

storiesOf('Components/ErrorCard', module)
  .add('Basic', () => (
    <div style={{ height: '20rem', padding: '2em 5em 2em 2em' }}>
      <ErrorCard
        retryFunc={action('retry-clicked')}
      />
    </div>
  ))

  .add('Stats', () => (
    <div style={{ height: '20rem', padding: '2em 5em 2em 2em' }}>
      <StatsErrorCard
        fetchStatsCompare={action('retry-stats-clicked')}
      />
    </div>
  ))

  .add('Advanced Stats', () => (
    <div style={{ height: '20rem', padding: '2em 5em 2em 2em' }}>
      <AdvancedStatsErrorCard
        fetchSimulations={action('retry-simulations-clicked')}
      />
    </div>
  ));
