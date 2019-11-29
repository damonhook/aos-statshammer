import React from 'react';
import { storiesOf } from '@storybook/react';
import StatsContainer from 'containers/Stats/StatsContainer';
import Graphs from 'containers/Stats/Graphs';
import ResultsTable from 'containers/Stats/ResultsTable';
import { boolean } from '@storybook/addon-knobs';

const stats = {
  pending: false,
  error: null,
  payload: [
    {
      'Unit 1': 5.93,
      'Unit 2': 16.3,
      save: '1',
    },
    {
      'Unit 1': 11.85,
      'Unit 2': 16.3,
      save: '2',
    },
    {
      'Unit 1': 17.78,
      'Unit 2': 19.26,
      save: '3',
    },
    {
      'Unit 1': 23.7,
      'Unit 2': 22.22,
      save: '4',
    },
    {
      'Unit 1': 29.63,
      'Unit 2': 25.19,
      save: '5',
    },
    {
      'Unit 1': 35.56,
      'Unit 2': 28.15,
      save: '6',
    },
    {
      'Unit 1': 35.56,
      'Unit 2': 31.11,
      save: 'None',
    },
  ],
};

const unitNames = ['Unit 1', 'Unit 2'];

const getStats = (pending) => ({
  ...stats,
  pending,
});

storiesOf('Containers/Stats', module)
  .add('Basic', () => (
    <StatsContainer stats={getStats(boolean('Pending', false))} unitNames={unitNames} />
  ))

  .add('Graphs', () => (
    <Graphs stats={getStats(boolean('Pending', false))} unitNames={unitNames} />
  ))

  .add('Table', () => (
    <ResultsTable stats={getStats(boolean('Pending', false))} unitNames={unitNames} />
  ));
