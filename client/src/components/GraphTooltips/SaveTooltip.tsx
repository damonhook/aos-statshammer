import React from 'react';
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

interface ISaveTooltipProps extends ITooltipProps {}

/**
 * A tooltip to display when you hover over a value in a graph
 */
const SaveTooltip: React.FC<ISaveTooltipProps> = ({ active, payload, label }) => {
  const classes = useStyles();
  if (active) {
    return (
      <Paper className={classes.tooltip}>
        <Typography variant="h6">
          {`Save: ${Number(label) !== 0 && label !== 'None' ? `${label}+` : '-'}`}
        </Typography>
        {(payload ?? []).map(({ color, name, value }) => (
          <Typography style={{ color }} key={name}>{`${name}: ${value}`}</Typography>
        ))}
      </Paper>
    );
  }
  return null;
};

SaveTooltip.defaultProps = {
  active: false,
  payload: [],
  label: '',
};

export default SaveTooltip;
