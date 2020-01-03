import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import { ITooltipProps } from './types';

const useStyles = makeStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.graphs.tooltip,
    color: theme.palette.getContrastText(theme.palette.graphs.tooltip),
    padding: theme.spacing(1, 2),
  },
}));

interface IProbabilityTooltipProps extends ITooltipProps {
  cumulative?: boolean;
}

/**
 * A tooltip to display when you hover over a value in a graph
 */
const ProbabilityTooltip: React.FC<IProbabilityTooltipProps> = ({ active, payload, label, cumulative }) => {
  const classes = useStyles();
  if (active) {
    return (
      <Paper className={classes.tooltip}>
        <Typography variant="h6">{`Damage: ${cumulative ? '<= ' : ''}${label}`}</Typography>
        {(payload || []).map(({ color, name, value }) => (
          <Typography style={{ color }} key={name}>{`${name}: ${value}%`}</Typography>
        ))}
      </Paper>
    );
  }
  return null;
};

ProbabilityTooltip.defaultProps = {
  active: false,
  payload: [],
  label: '',
  cumulative: false,
};

export default ProbabilityTooltip;
