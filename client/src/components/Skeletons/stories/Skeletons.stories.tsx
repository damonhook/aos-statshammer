import React from 'react';
import { storiesOf } from '@storybook/react';
import TableSkeleton from 'components/Skeletons/TableSkeleton';
import GraphSkeleton from 'components/Skeletons/GraphSkeleton';
import { number, boolean } from '@storybook/addon-knobs';
import Container from 'utils/Container';

storiesOf('Components/Skeletons', module)
  .add('Table', () => (
    <Container variant="paper">
      <TableSkeleton rows={number('Rows', 7)} cols={number('Columns', 3)} dense={boolean('Dense', false)} />
    </Container>
  ))

  .add('Graph', () => (
    <Container variant="paper">
      <GraphSkeleton height={300} series={number('Series', 7)} groups={number('Groups', 2)} />
    </Container>
  ));
