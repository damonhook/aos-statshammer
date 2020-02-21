import { CircularProgress, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  loader: {
    width: '100%',
    height: '100%',
    display: 'flex',
    textAlign: 'center',
  },
  loaderInner: {
    margin: 'auto',
    minWidth: theme.spacing(40),
    padding: theme.spacing(5, 4),
  },
  loaderIcon: {
    marginBottom: theme.spacing(3),
  },
}));

const PdfLoader = () => {
  const classes = useStyles();

  return (
    <div className={classes.loader}>
      <Paper className={classes.loaderInner}>
        <CircularProgress size="6em" className={classes.loaderIcon} disableShrink />
        <Typography variant="h5">Generating</Typography>
      </Paper>
    </div>
  );
};

export default PdfLoader;
