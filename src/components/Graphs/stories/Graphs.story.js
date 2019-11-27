import React from 'react';
import { storiesOf } from '@storybook/react';
import Graphs from 'components/Graphs';
import BarGraph from 'components/Graphs/BarGraph';
import LineGraph from 'components/Graphs/LineGraph';
import RadarGraph from 'components/Graphs/RadarGraph';

const unitNames = ['Unit 1', 'Unit 2'];
const data = [
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
];

const graphColors = [
  '#8884d8',
  '#82ca9d',
  '#ff7300',
  '#413ea0',
];

storiesOf('Components/Graphs', module)
  .add('Full', () => (
    <Graphs results={data} unitNames={unitNames} />
  ))
  .add('Line Graph', () => (
    <div style={{ height: '300px' }}><LineGraph results={data} unitNames={unitNames} colors={graphColors} /></div>
  ))
  .add('Bar Graph', () => (
    <div style={{ height: '300px' }}><BarGraph results={data} unitNames={unitNames} colors={graphColors} /></div>
  ))
  .add('Radar Graph', () => (
    <div style={{ height: '300px' }}><RadarGraph results={data} unitNames={unitNames} colors={graphColors} /></div>
  ));
