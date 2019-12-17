import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabbed from 'components/Tabbed';
import { Paper } from '@material-ui/core';
import ListItem from 'components/ListItem';
import GraphWrapper from './GraphWrapper';

const useStyles = makeStyles(() => ({
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

export default GraphTabbed;
