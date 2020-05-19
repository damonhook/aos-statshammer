import { CircularProgress, Paper, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  loader: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    height: 400,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    marginBottom: theme.spacing(3),
  },
}));

const Loader = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.loader}>
      <CircularProgress size={92} disableShrink className={classes.circle} />
      <Typography variant="h6">Loading</Typography>
    </Paper>
  );
};

export default Loader;
