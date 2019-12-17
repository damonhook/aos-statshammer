import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabbed from 'components/Tabbed';
import { BarGraph, LineGraph, RadarGraph } from 'components/Graphs';
import GraphSkeleton from 'components/Skeletons/GraphSkeleton';
import { useMediaQuery, Typography, Paper } from '@material-ui/core';
import ListItem from 'components/ListItem';
import StatsErrorCard from 'components/StatsErrorCard';

const useStyles = makeStyles((theme) => ({
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
  error: {
    height: '350px',
    width: 'auto',
    margin: theme.spacing(2, 2, 0),
  },
}));

const GraphWrapper = ({
  loading, error, children, numUnits,
}) => {
  const classes = useStyles();
  const groups = numUnits || 1;

  if (loading) {
    return <GraphSkeleton height={340} series={7} groups={groups} className={classes.loader} />;
  }
  if (error) {
    return <StatsErrorCard className={classes.error} />;
  }
  return <div>{children}</div>;
};

const GraphTabbed = ({ stats, unitNames, graphMap }) => {
  const classes = useStyles();
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
        tabNames={[...graphMap.keys()]}
        tabContent={[...graphMap].map(([name, Graph]) => (
          <GraphWrapper
            loading={firstLoad}
            numUnits={unitNames.length}
            key={name}
            error={Boolean(stats.error)}
          >
            <Paper square className={classes.tab}>
              <Graph
                className={classes.content}
                results={stats.payload}
                unitNames={unitNames}
              />
            </Paper>
          </GraphWrapper>
        ))}
      />
    </ListItem>
  );
};

const GraphList = ({ stats, unitNames, graphMap }) => {
  const classes = useStyles();
  const firstLoad = (!stats.payload || !stats.payload.length) && stats.pending;

  return (
    <Typography component="div">
      {[...graphMap].map(([name, Graph]) => (
        <ListItem
          key={name}
          header={name}
          collapsible
          loading={stats.pending}
          loaderDelay={firstLoad ? 0 : 350}
        >
          <GraphWrapper
            loading={(!stats.payload || !stats.payload.length) && stats.pending}
            numUnits={unitNames.length}
            error={Boolean(stats.error)}
          >
            <Graph
              className={classes.content}
              results={stats.payload}
              unitNames={unitNames}
            />
          </GraphWrapper>
        </ListItem>
      ))}
    </Typography>
  );
};

const Graphs = ({ stats, unitNames, config }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const graphMap = new Map([
    ['Bar Graph', BarGraph],
    ['Line Graph', LineGraph],
    ['Radar Graph', RadarGraph],
  ]);

  return mobile || config.desktopGraphList
    ? (
      <GraphList
        stats={stats}
        unitNames={unitNames}
        graphMap={graphMap}
      />
    )
    : (
      <GraphTabbed
        stats={stats}
        unitNames={unitNames}
        graphMap={graphMap}
      />
    );
};

const mapStateToProps = (state) => ({
  config: state.config,
});

export default connect(mapStateToProps)(Graphs);
