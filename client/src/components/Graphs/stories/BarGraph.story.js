import React from 'react';
import { storiesOf } from '@storybook/react';
import { BarGraph } from 'components/Graphs';
import { number, text, boolean } from '@storybook/addon-knobs';
import Container from 'utils/Container';
import { getSeriesNames, generateData } from './graphStoryUtils';

storiesOf('Components/Graphs', module)
  .add('Bar Graph', () => {
    const numX = number('Num X Values', 10, { min: 1, max: 30 });
    const numSeries = number('Num Series', 2, { min: 1, max: 5 });
    const seriesNames = getSeriesNames(numSeries);
    const data = generateData(seriesNames, numX);
    return (
      <Container variant="paper">
        <div style={{ height: '400px' }}>
          <BarGraph
            data={data}
            title={text('Title', 'Graph Title')}
            series={seriesNames}
            xAxis={{
              dataKey: 'name',
            }}
            isAnimationActive={boolean('Animated', true)}
          />
        </div>
      </Container>
    );
  });
