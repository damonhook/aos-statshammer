import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CircularProgress, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  loader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10em',
    width: 'auto',
  },
  loaderText: {
    marginTop: theme.spacing(2),
  },
}));

const PendingModifiers = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.loader}>
      <CircularProgress />
      <Typography variant="h6" className={classes.loaderText}>Loading...</Typography>
    </Paper>
  );
};

export default PendingModifiers;
