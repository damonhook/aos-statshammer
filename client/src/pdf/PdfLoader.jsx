import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CircularProgress, Typography, Paper,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  loader: {
    width: '100%',
    height: '100vh',
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
