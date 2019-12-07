import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabbed from 'components/Tabbed';
import { BarGraph, LineGraph, RadarGraph } from 'components/Graphs';
import GraphSkeleton from 'components/Skeletons/GraphSkeleton';
import { useMediaQuery, Typography, Paper } from '@material-ui/core';
import ListItem from 'components/ListItem';

const useStyles = makeStyles({
  graphContainer: {},
  tabs: {
    margin: '-1em -1em 0',
  },
  tab: {
    padding: '1em 1em 0',
  },
  content: {
    height: '350px',
    paddingTop: '2em',
    overflow: 'hidden',
    flexBasis: '50%',
  },
  loader: {
    padding: '2em',
  },
});

const graphColors = [
  '#8884d8',
  '#82ca9d',
  '#ff7300',
  '#413ea0',
  '#f50057',
];

const LoadableWrapper = ({ loading, children, numUnits }) => {
  const classes = useStyles();
  const groups = numUnits || 1;

  return (
    <div>
      {loading
        ? <GraphSkeleton height={340} series={7} groups={groups} className={classes.loader} />
        : children}
    </div>
  );
};

const GraphTabbed = ({ stats, unitNames, graphList }) => {
  const classes = useStyles();
  const tabNames = ['Line Graph', 'Bar Graph', 'Radar Graph'];
  const firstLoad = (!stats.payload || !stats.payload.length) && stats.pending;

  return (
    <ListItem
      header="Graphs"
      collapsible
      loading={stats.pending}
      loaderDelay={firstLoad ? 0 : 350}
      className={classes.graphContainer}
    >
      <Tabbed
        className={classes.tabs}
        tabNames={tabNames}
        tabContent={graphList.map((Graph, index) => (
          <LoadableWrapper
            loading={firstLoad}
            numUnits={unitNames.length}
            key={tabNames[index]}
          >
            <Paper square className={classes.tab}>
              <Graph
                className={classes.content}
                results={stats.payload}
                unitNames={unitNames}
                colors={graphColors}
              />
            </Paper>
          </LoadableWrapper>
        ))}
      />
    </ListItem>
  );
};

const GraphList = ({ stats, unitNames, graphList }) => {
  const classes = useStyles();
  const names = ['Line Graph', 'Bar Graph', 'Radar Graph'];
  const firstLoad = (!stats.payload || !stats.payload.length) && stats.pending;

  return (
    <Typography component="div">
      {graphList.map((Graph, index) => (
        <ListItem
          key={names[index]}
          header={names[index]}
          collapsible
          loading={stats.pending}
          loaderDelay={firstLoad ? 0 : 350}
        >
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
        </ListItem>
      ))}
    </Typography>
  );
};

const Graphs = ({ stats, unitNames }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

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
