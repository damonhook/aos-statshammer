import React, { useCallback, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { LineGraph } from 'components/Graphs';
import { Grid } from '@material-ui/core';
import _ from 'lodash';
import { ProbabilityTooltip } from 'components/GraphTooltips';
import ListItem from 'components/ListItem';
import clsx from 'clsx';
import { getMaxDamage, getTicks, REFERENCE_LINE_OPTIONS } from './probabilityUtils';
import Loadable from './Loadable';
import GraphControls from './GraphControls';

const useStyles = makeStyles((theme) => ({
  probabilityCurves: {},
  content: {},
  graphContainer: ({ numUnits }) => ({
    height: numUnits >= 3 ? '350px' : '300px',
    marginBottom: theme.spacing(3),
    flexBasis: '50%',
    minWidth: '450px',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    },
  }),
  controls: {
    display: 'flex',
    padding: theme.spacing(2, 2, 2, 0),
    marginBottom: theme.spacing(2),
    border: '1px solid',
    borderColor: theme.palette.grey[700],
    borderRadius: theme.shape.borderRadius,
    marginTop: '-0.7rem',
  },
  select: {
    flex: 1,
  },
  label: {
    position: 'relative',
    left: theme.spacing(2),
    background: theme.palette.background.paper,
    fontSize: theme.typography.body2.fontSize,
  },
  selectInfo: {
  },
  field: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
  },
}));

const CumulativeCurves = React.memo(({
  probabilities, unitNames, className, error, pending,
}) => {
  const classes = useStyles({ numUnits: unitNames.length });
  const theme = useTheme();
  const [activeReferenceLine, setActiveReferenceLine] = useState(REFERENCE_LINE_OPTIONS.NONE);
  const [matchXAxis, setMatchXAxis] = useState(true);

  let maxDamage = matchXAxis ? 0 : 'dataMax';
  const ticks = getTicks(100);
  if (matchXAxis && probabilities && probabilities.length) {
    maxDamage = getMaxDamage(probabilities) + 1;
  }

  const yAxisLabel = useCallback((value) => `${value}%`, []);
  let activeMetric = null;
  if (activeReferenceLine !== REFERENCE_LINE_OPTIONS.NONE) {
    activeMetric = activeReferenceLine.toLowerCase();
  }

  const handleReferenceLineChanged = (value) => {
    setActiveReferenceLine(value);
  };

  const handleSetMatchXAxisChanged = (value) => {
    setMatchXAxis(value);
  };

  return (
    <ListItem
      className={clsx(classes.probabilityCurves, className)}
      header="Cumulative Probability Curves"
      collapsible
      loading={pending}
      loaderDelay={0}
    >
      <GraphControls
        matchXAxis={matchXAxis}
        setMatchXAxis={handleSetMatchXAxisChanged}
        activeReferenceLine={activeReferenceLine}
        setActiveReferenceLine={handleReferenceLineChanged}
      />
      <Loadable loading={pending} numUnits={unitNames.length} error={error}>
        <Grid container spacing={2} className={classes.content}>
          {probabilities.map(({ save, cumulative, metrics }) => (
            <Grid item className={classes.graphContainer} key={save}>
              <LineGraph
                title={`Cumulative Damage Probability (${save === 'None' ? '-' : `${save}+`})`}
                data={cumulative}
                series={unitNames}
                xAxis={{
                  domain: [0, maxDamage],
                  type: 'number',
                  dataKey: 'damage',
                  tickCount: 10,
                }}
                yAxis={{
                  tickFormatter: yAxisLabel,
                  domain: [0, 100],
                  type: 'number',
                  ticks,
                }}
                yAxisLabel={{
                  value: 'Probability (%)',
                }}
                dotSize={0}
                referenceLines={activeMetric
                  ? Object.keys(metrics[activeMetric]).map((name) => {
                    const unitIndex = unitNames.findIndex((unitName) => unitName === name);
                    const stroke = unitIndex >= 0 ? (
                      theme.palette.graphs.series[unitIndex]
                    ) : theme.palette.graphs.axis;
                    return { x: metrics[activeMetric][name], stroke, dataKey: name };
                  })
                  : null}
                tooltip={<ProbabilityTooltip cumulative />}
              />
            </Grid>
          ))}
        </Grid>
      </Loadable>
    </ListItem>
  );
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

export default CumulativeCurves;
