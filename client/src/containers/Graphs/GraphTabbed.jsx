import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabbed from 'components/Tabbed';
import { Paper } from '@material-ui/core';
import ListItem from 'components/ListItem';
import GraphWrapper from './GraphWrapper';

const useStyles = makeStyles((theme) => ({
  tabs: {
    margin: '-1em -1em 0',
  },
  tab: {
    padding: '1em 1em 0',
  },
  content: {
    height: '350px',
    paddingTop: 0,
    overflow: 'hidden',
    flexBasis: '50%',
  },
}));

const GraphTabbed = ({ stats, unitNames, graphMap }) => {
  const classes = useStyles();
  const firstLoad = (!stats.payload || !stats.payload.length) && stats.pending;

  return (
    <ListItem
      header="Graphs"
      collapsible
      loading={stats.pending}
      loaderDelay={firstLoad ? 0 : 350}
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

GraphTabbed.propTypes = {
  /** The current state of the stats reducer. */
  stats: PropTypes.shape({
    pending: PropTypes.bool,
    payload: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.string,
  }).isRequired,
  /** An array containing the unit names */
  unitNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** A mapping of Graph Name -> Graph Component, in render order */
  graphMap: PropTypes.instanceOf(Map).isRequired,
};

export default GraphTabbed;
