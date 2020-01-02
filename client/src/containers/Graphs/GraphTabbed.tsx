import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabbed from 'components/Tabbed';
import { Paper } from '@material-ui/core';
import ListItem from 'components/ListItem';
import { SaveTooltip } from 'components/GraphTooltips';
import GraphWrapper from './GraphWrapper';
import { IStatsStore } from 'types/store';

const useStyles = makeStyles(() => ({
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

interface GraphTabbedProps {
  stats: IStatsStore;
  unitNames: string[];
  graphMap: Map<string, any>;
}

const GraphTabbed: React.FC<GraphTabbedProps> = ({ stats, unitNames, graphMap }) => {
  const classes = useStyles();
  const firstLoad = (!stats.payload || !stats.payload.length) && stats.pending;
  const xAxisFormatter = useCallback(value => (value === 'None' ? '-' : `${value}+`), []);

  return (
    <ListItem header="Graphs" collapsible loading={stats.pending} loaderDelay={firstLoad ? 0 : 350}>
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
                title="Average Damage"
                className={classes.content}
                data={stats.payload}
                series={unitNames}
                xAxis={{
                  dataKey: 'save',
                  tickFormatter: xAxisFormatter,
                }}
                yAxisLabel={{
                  value: 'Average Damage',
                  position: 'insideLeft',
                }}
                tooltip={<SaveTooltip />}
              />
            </Paper>
          </GraphWrapper>
        ))}
      />
    </ListItem>
  );
};

export default GraphTabbed;
