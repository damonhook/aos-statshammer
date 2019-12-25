import React, { useCallback } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { LineGraph } from 'components/Graphs';
import { Grid } from '@material-ui/core';
import _ from 'lodash';
import { ProbabilityTooltip } from 'components/GraphTooltips';
import {
  getMaxDamage, getMaxProbability, getTicks,
} from 'containers/AdvancedStats/probabilityUtils';

const useStyles = makeStyles((theme) => ({
  content: {},
  graphContainer: ({ numUnits }) => ({
    // height: numUnits >= 3 ? '350px' : '250px',
    height: '350px',
    marginBottom: theme.spacing(3),
    flexBasis: '50%',
    minWidth: '450px',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    },
  }),
}));

const BasicCurves = React.memo(({
  probabilities, unitNames, activeMetric,
}) => {
  const classes = useStyles({ numUnits: unitNames.length });
  const theme = useTheme();

  let [maxDamage, maxProbability, ticks] = [0, 0, null];
  if (probabilities && probabilities.length) {
    maxDamage = getMaxDamage(probabilities);
    maxProbability = getMaxProbability(probabilities);
    if (maxProbability) {
      ticks = getTicks(maxProbability);
    }
  }

  const yAxisLabel = useCallback((value) => `${value}%`, []);

  return (
    <Grid container spacing={2} className={classes.content}>
      {probabilities.map(({ save, buckets, metrics }) => (
        <Grid item className={classes.graphContainer} key={save}>
          <LineGraph
            title={`Damage Probability (${save === 'None' ? '-' : `${save}+`})`}
            data={buckets}
            series={unitNames}
            xAxis={{
              domain: [0, maxDamage],
              type: 'number',
              dataKey: 'damage',
              tickCount: 10,
            }}
            yAxis={{
              tickFormatter: yAxisLabel,
              domain: [0, Math.ceil(maxProbability / 10) * 10],
              type: 'number',
              ticks,
            }}
            yAxisLabel={{
              value: 'Probability (%)',
            }}
            dotSize={1}
            referenceLines={activeMetric
              ? Object.keys(metrics[activeMetric]).map((name) => {
                const unitIndex = unitNames.findIndex((unitName) => unitName === name);
                const stroke = unitIndex >= 0 ? (
                  theme.palette.graphs.series[unitIndex]
                ) : theme.palette.graphs.axis;
                return { x: metrics[activeMetric][name], stroke, dataKey: name };
              })
              : null}
            tooltip={<ProbabilityTooltip />}
          />
        </Grid>
      ))}
    </Grid>
  );
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

export default BasicCurves;
