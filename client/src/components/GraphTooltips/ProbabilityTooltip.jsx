import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.graphs.tooltip,
    color: theme.palette.getContrastText(theme.palette.graphs.tooltip),
    padding: theme.spacing(1, 2),
  },
}));

/**
 * A tooltip to display when you hover over a value in a graph
 */
const ProbabilityTooltip = ({ active, payload, label }) => {
  const classes = useStyles();
  if (active) {
    return (
      <Paper className={classes.tooltip}>
        <Typography variant="h6">{`Damage: ${label}`}</Typography>
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
};

ProbabilityTooltip.propTypes = {
  /** Whether the tooltip is active (being hovered) */
  active: PropTypes.bool,
  /** The data payload */
  payload: PropTypes.arrayOf(PropTypes.object),
  /** The series label */
  label: PropTypes.string,
};

export default ProbabilityTooltip;
