import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LineGraph } from 'components/Graphs';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';
import ListItem from 'components/ListItem';
import { GraphSkeleton } from 'components/Skeletons';
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

const Loadable = React.memo(({ children, loading, numUnits }) => {
  const classes = useStyles({ numUnits });

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
  pending, probabilities, unitNames, className,
}) => {
  const classes = useStyles({ numUnits: unitNames.length });
  const [firstLoad, setFirstLoad] = useState(true);

  let [maxDamage, maxProbability, ticks] = [0, 0, []];
  if (probabilities && probabilities.length) {
    maxDamage = getMaxDamage(probabilities);
    maxProbability = getMaxProbability(probabilities);
    ticks = [...Array(Math.ceil(maxProbability / 10) + 1)].map((_, index) => index * 10);
  }

  const yAxisLabel = useCallback((value) => `${value}%`, []);

  const onAnimationEnd = useCallback(() => {
    setFirstLoad(false);
  }, []);

  return (
    <ListItem
      className={clsx(classes.probabilityCurves, className)}
      header="Probability Curves"
      collapsible
      loading={pending}
      loaderDelay={0}
    >
      <Loadable loading={pending} numUnits={unitNames.length}>
        <Grid container spacing={2} className={classes.content}>
          {probabilities.map(({ save, buckets }) => (
            <Grid item className={classes.graphContainer}>
              <LineGraph
                title={`Damage Probability (${save === 'None' ? '-' : `${save}+`})`}
                data={buckets}
                series={unitNames}
                isAnimationActive={firstLoad}
                xAxis={{
                  domain: [0, maxDamage],
                  type: 'number',
                  dataKey: 'damage',
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
                onAnimationEnd={onAnimationEnd}
              />
            </Grid>
          ))}
        </Grid>
      </Loadable>
    </ListItem>
  );
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

export default ProbabilityCurves;
