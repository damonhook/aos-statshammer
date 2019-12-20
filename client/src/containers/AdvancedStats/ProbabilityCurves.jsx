import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LineGraph } from 'components/Graphs';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';
import ListItem from 'components/ListItem';

const useStyles = makeStyles((theme) => ({
  probabilityCurves: {},
  content: {},
  graphContainer: {
    height: '250px',
    marginBottom: theme.spacing(3),
    flexBasis: '50%',
    minWidth: '450px',
    flex: 1,
  },
}));

const getMaxDamage = (probabilities) => (
  Math.max(...probabilities.map(({ buckets }) => (
    Math.max(...buckets.map(({ damage }) => Number(damage)))
  )))
);

const getMaxProbability = (probabilities) => (
  Math.max(...probabilities.map(({ buckets }) => (
    Math.max(...buckets.map(({ damage, ...other }) => (
      Math.max(...Object.values(other).map((i) => Number(i)))
    )))
  )))
);

const ProbabilityCurves = ({ probabilities, unitNames, className }) => {
  const classes = useStyles();
  const maxDamage = getMaxDamage(probabilities);
  const maxProbability = getMaxProbability(probabilities);
  const yAxisLabel = useCallback((value) => `${value}%`, []);

  return (
    <ListItem
      className={clsx(classes.probabilityCurves, className)}
      header="Probability Curves"
      collapsible
    >
      <Grid container spacing={2} className={classes.content}>
        {probabilities.map(({ save, buckets }) => (
          <Grid item className={classes.graphContainer}>
            <LineGraph
              title={`Damage Probability (${save === 'None' ? '-' : `${save}+`})`}
              data={buckets}
              series={unitNames}
              xAxis={{
                domain: [0, maxDamage],
                type: 'number',
                dataKey: 'damage',
              }}
              yAxis={{
                tickFormatter: yAxisLabel,
                domain: [0, Math.ceil(maxProbability / 10) * 10],
                type: 'number',
                ticks: [...Array(Math.ceil(maxProbability / 10) + 1)].map((_, index) => index * 10),
              }}
              yAxisLabel={{
                value: 'Probability (%)',
              }}
            />
          </Grid>
        ))}
      </Grid>
    </ListItem>
  );
};

export default ProbabilityCurves;
