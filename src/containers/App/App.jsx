import React from 'react';
import Units from 'containers/Units';
import Stats from 'containers/Stats';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import AppContent from './AppContent';

const useStyles = makeStyles((theme) => ({
  app: {
    fontFamily: '"Roboto", sans-serif',
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
      <AppContent />
    </div>
  );
};


export default App;
