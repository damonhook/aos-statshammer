import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabbed from 'components/Tabbed';
import { BarGraph, LineGraph, RadarGraph } from 'components/Graphs';
import GraphSkeleton from 'components/Skeletons/GraphSkeleton';

const useStyles = makeStyles({
  graphContainer: {},
  content: {
    height: '300px',
    paddingTop: '2em',
    overflow: 'hidden',
    flexBasis: '50%',
  },
  loader: {
    paddingTop: '2em',
  },
});

const graphColors = [
  '#8884d8',
  '#82ca9d',
  '#ff7300',
  '#413ea0',
];

const LoadableWrapper = ({ loading, children, numUnits }) => {
  const classes = useStyles();
  const groups = numUnits || 1;

  return (
    <div>
      {loading
        ? <GraphSkeleton height={300} series={7} groups={groups} className={classes.loader} />
        : children}
    </div>
  );
};

const Graphs = ({ stats, unitNames }) => {
  const classes = useStyles();

  if (!stats.payload || !unitNames) {
    return null;
  }

  const graphList = [
    LineGraph, BarGraph, RadarGraph,
  ];

  return (
    <Tabbed
      className={`${classes.graphContainer}`}
      tabNames={['Line Graph', 'Bar Graph', 'Radar Graph']}
      tabContent={graphList.map((Graph) => (
        <LoadableWrapper loading={stats.pending} numUnits={unitNames.length}>
          <Graph
            className={classes.content}
            results={stats.payload}
            unitNames={unitNames}
            colors={graphColors}
          />
        </LoadableWrapper>
      ))}
    />
  );
};


export default Graphs;
