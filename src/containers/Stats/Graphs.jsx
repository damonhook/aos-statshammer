import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabbed from 'components/Tabbed';
import { BarGraph, LineGraph, RadarGraph } from 'components/Graphs';
import GraphSkeleton from 'components/Skeletons/GraphSkeleton';
import { useMediaQuery, Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  graphContainer: {},
  content: {
    height: '300px',
    paddingTop: '2em',
    overflow: 'hidden',
    flexBasis: '50%',
  },
  mobileContent: {
    paddingTop: '1em',
  },
  mobileWrapper: {
    paddingTop: '2em',
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

const GraphTabbed = ({ stats, unitNames, graphList }) => {
  const classes = useStyles();

  return (
    <Tabbed
      className={`${classes.graphContainer}`}
      tabNames={['Line Graph', 'Bar Graph', 'Radar Graph']}
      tabContent={graphList.map((Graph) => (
        <LoadableWrapper
          loading={(!stats.payload || !stats.payload.length) && stats.pending}
          numUnits={unitNames.length}
        >
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

const GraphList = ({ stats, unitNames, graphList }) => {
  const classes = useStyles();
  const names = ['Line Graph', 'Bar Graph', 'Radar Graph'];

  return (
    <Typography component="div">
      {graphList.map((Graph, index) => (
        <Typography component="div" className={classes.mobileWrapper}>
          <Typography variant="subtitle1">{names[index]}</Typography>
          <LoadableWrapper
            loading={(!stats.payload || !stats.payload.length) && stats.pending}
            numUnits={unitNames.length}
          >
            <Graph
              className={clsx(classes.content, classes.mobileContent)}
              results={stats.payload}
              unitNames={unitNames}
              colors={graphColors}
            />
          </LoadableWrapper>
        </Typography>
      ))}
    </Typography>
  );
};

const Graphs = ({ stats, unitNames }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!stats.payload || !unitNames) {
    return null;
  }

  const graphList = [
    LineGraph, BarGraph, RadarGraph,
  ];

  return mobile
    ? (
      <GraphList
        stats={stats}
        unitNames={unitNames}
        graphList={graphList}
      />
    )
    : (
      <GraphTabbed
        stats={stats}
        unitNames={unitNames}
        graphList={graphList}
      />
    );
};


export default Graphs;
