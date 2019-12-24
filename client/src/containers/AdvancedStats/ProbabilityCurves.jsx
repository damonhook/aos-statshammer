import React, { useCallback, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { LineGraph } from 'components/Graphs';
import {
  Grid, MenuItem, TextField, Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import ListItem from 'components/ListItem';
import { GraphSkeleton } from 'components/Skeletons';
import { AdvancedStatsErrorCard } from 'components/ErrorCards';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  probabilityCurves: {},
  content: {},
  graphContainer: ({ numUnits }) => ({
    height: numUnits >= 3 ? '350px' : '250px',
    marginBottom: theme.spacing(3),
    flexBasis: '50%',
    minWidth: '450px',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    },
  }),
  skeleton: {
    padding: theme.spacing(2, 4, 5),
  },
  select: {
    maxWidth: '100%',
    display: 'flex',
    width: '50%',
    margin: theme.spacing(0, 1.5, 4),
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  selectInfo: {
    margin: 'auto',
    marginRight: theme.spacing(2),
  },
  field: {
    flex: 1,
  },
}));

const REFERENCE_LINE_OPTIONS = {
  NONE: 'None',
  MEAN: 'Mean',
  MEDIAN: 'Median',
  MAX: 'Max',
};

const getMaxDamage = (probabilities) => (
  Math.max(...probabilities.map(({ metrics }) => (
    Math.max(...Object.values(metrics.max).map((d) => Number(d)))
  )))
);

const getMaxProbability = (probabilities) => (
  Math.max(...probabilities.map(({ buckets }) => (
    Math.max(...buckets.map(({ damage, ...other }) => (
      Math.max(...Object.values(other).map((p) => Number(p)))
    )))
  )))
);

const Loadable = React.memo(({
  children, loading, numUnits, error,
}) => {
  const classes = useStyles({ numUnits });

  if (error) {
    return <AdvancedStatsErrorCard />;
  }
  if (loading) {
    return (
      <Grid container spacing={2}>
        {[...Array(6)].map(() => (
          <Grid item className={classes.graphContainer}>
            <GraphSkeleton
              series={5}
              groups={2}
              height={numUnits >= 3 ? 350 : 250}
              className={classes.skeleton}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
  return children;
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

const ProbabilityCurves = React.memo(({
  pending, probabilities, unitNames, className, error,
}) => {
  const classes = useStyles({ numUnits: unitNames.length });
  const theme = useTheme();
  const [activeReferenceLine, setActiveReferenceLine] = useState(REFERENCE_LINE_OPTIONS.NONE);

  let [maxDamage, maxProbability, ticks] = [0, 0, null];
  if (probabilities && probabilities.length) {
    maxDamage = getMaxDamage(probabilities);
    maxProbability = getMaxProbability(probabilities);
    if (maxProbability) {
      ticks = [...Array(Math.ceil(maxProbability / 10) + 1)].map((_, index) => index * 10);
    }
  }

  const yAxisLabel = useCallback((value) => `${value}%`, []);

  let activeMetric = null;
  if (activeReferenceLine !== REFERENCE_LINE_OPTIONS.NONE) {
    activeMetric = activeReferenceLine.toLowerCase();
  }

  const handleReferenceLineChanged = (event) => {
    setActiveReferenceLine(event.target.value);
  };

  return (
    <ListItem
      className={clsx(classes.probabilityCurves, className)}
      header="Probability Curves"
      collapsible
      loading={pending}
      loaderDelay={0}
    >
      <div className={classes.select}>
        <Typography className={classes.selectInfo}>Reference Lines:</Typography>
        <TextField
          select
          variant="filled"
          label="Metric"
          className={classes.field}
          value={activeReferenceLine}
          onChange={handleReferenceLineChanged}
        >
          {Object.values(REFERENCE_LINE_OPTIONS).map((option) => (
            <MenuItem value={option}>{option}</MenuItem>
          ))}
        </TextField>
      </div>
      <Loadable loading={pending} numUnits={unitNames.length} error={error}>
        <Grid container spacing={2} className={classes.content}>
          {probabilities.map(({ save, buckets, metrics }) => (
            <Grid item className={classes.graphContainer}>
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
                referenceLines={activeMetric
                  ? Object.keys(metrics[activeMetric]).map((name) => {
                    const unitIndex = unitNames.findIndex((unitName) => unitName === name);
                    const stroke = unitIndex >= 0 ? (
                      theme.palette.graphs.series[unitIndex]
                    ) : theme.palette.graphs.axis;
                    return { x: metrics[activeMetric][name], stroke, dataKey: name };
                  })
                  : null}
              />
            </Grid>
          ))}
        </Grid>
      </Loadable>
    </ListItem>
  );
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

export default ProbabilityCurves;
