import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  loader: {
    display: 'flex',
    margin: theme.spacing(0.5, 0, 0.5, 3),
  },
  loaderIcon: {
    marginLeft: theme.spacing(1),
    alignItems: 'center',
  },
}));

/**
 * Used to indicate that the modifier definitions are currently loading
 */
const SummaryLoading = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Typography component="div" className={classes.loader}>
      <Typography>Loading...</Typography>
      <CircularProgress
        className={classes.loaderIcon}
        size={theme.typography.body1.fontSize}
        color="secondary"
      />
    </Typography>
  );
};

export default SummaryLoading;
