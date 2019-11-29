import React from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import AppContent from './AppContent';


const theme = createMuiTheme({
  typography: {
    htmlFontSize: 18,
  },
});

const useStyles = makeStyles(() => ({
  app: {
    fontFamily: '"Roboto", sans-serif',
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};


export default App;
