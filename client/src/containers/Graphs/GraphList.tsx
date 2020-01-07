import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { SaveTooltip } from 'components/GraphTooltips';
import { IStatsStore } from 'types/store';
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

interface GraphListProps {
  stats: IStatsStore;
  unitNames: string[];
  graphMap: Map<string, any>;
}

const GraphList: React.FC<GraphListProps> = ({ stats, unitNames, graphMap }) => {
  const classes = useStyles();
  const firstLoad = (!stats.payload || !stats.payload.length) && stats.pending;
  const xAxisFormatter = useCallback(value => (value === 'None' ? '-' : `${value}+`), []);

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
          </GraphWrapper>
        </ListItem>
      ))}
    </Typography>
  );
};

export default GraphList;
