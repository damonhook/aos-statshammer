import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ListItem from 'components/ListItem';
import GraphWrapper from './GraphWrapper';

const useStyles = makeStyles(() => ({
  content: {
    height: '350px',
    paddingTop: 0,
    overflow: 'hidden',
    flexBasis: '50%',
  },
}));

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

GraphList.propTypes = {
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

export default GraphList;
