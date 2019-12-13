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

const graphNames = ['Line Graph', 'Bar Graph', 'Radar Graph'];
const graphList = [LineGraph, BarGraph, RadarGraph];

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

const GraphTabbed = ({ stats, unitNames, graphList }) => {
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
        tabNames={graphNames}
        tabContent={graphList.map((Graph, index) => (
          <GraphWrapper
            loading={firstLoad}
            numUnits={unitNames.length}
            key={graphNames[index]}
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

const GraphList = ({ stats, unitNames, graphList }) => {
  const classes = useStyles();
  const firstLoad = (!stats.payload || !stats.payload.length) && stats.pending;

  return (
    <Typography component="div">
      {graphList.map((Graph, index) => (
        <ListItem
          key={graphNames[index]}
          header={graphNames[index]}
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

  return mobile || config.desktopGraphList
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

const mapStateToProps = (state) => ({
  config: state.config,
});

export default connect(mapStateToProps)(Graphs);
