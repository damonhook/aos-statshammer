import React, { useCallback, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  MenuItem, TextField, Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import ListItem from 'components/ListItem';
import _ from 'lodash';
import {
  getMaxDamage, getMaxProbability, getTicks,
} from 'containers/AdvancedStats/probabilityUtils';
import Loadable from './Loadable';
import BasicCurves from './BasicCurves';
import CumulativeCurves from './CumulativeCurves';

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
      ticks = getTicks(maxProbability);
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
            <MenuItem value={option} key={option}>{option}</MenuItem>
          ))}
        </TextField>
      </div>
      <Loadable loading={pending} numUnits={unitNames.length} error={error}>
        {/* <BasicCurves
          probabilities={probabilities}
          unitNames={unitNames}
          activeMetric={activeMetric}
        /> */}
        <CumulativeCurves
          probabilities={probabilities}
          unitNames={unitNames}
          activeMetric={activeMetric}
          matchXAxis
        />
      </Loadable>
    </ListItem>
  );
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

export default ProbabilityCurves;
