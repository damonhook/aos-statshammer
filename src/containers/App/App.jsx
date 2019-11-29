import React from 'react';
import Units from 'containers/Units';
import Stats from 'containers/Stats';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  app: {
    fontFamily: '"Roboto", sans-serif',
  },
  container: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1366px',
    margin: '2em auto',
    [theme.breakpoints.down('md')]: {
      width: '95%',
      marginTop: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      maxWidth: '2166px',
      width: '95%',
    },
  },
  separator: {
    height: '1em',
    width: '1em',
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6">
            Statshammer
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <Units />
        <div className={classes.separator} />
        <Stats />
      </div>
    </div>
  );
};


export default App;
