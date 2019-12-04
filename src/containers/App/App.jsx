import React from 'react';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import AppBar from 'components/AppBar';
import { basicTheme } from 'themes';
import { useMediaQuery } from '@material-ui/core';
import StoreSubscriber from 'components/StoreSubscriber';
import DesktopAppContent from './DesktopAppContent';
import MobileAppContent from './MobileAppContent';

const useStyles = makeStyles(() => ({
  app: {
    fontFamily: '"Roboto", sans-serif',
  },
}));

const App = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={basicTheme}>
      <div className={classes.app}>
        <AppBar title="Statshammer" />
        <StoreSubscriber />
        {mobile ? <MobileAppContent /> : <DesktopAppContent />}
      </div>
    </ThemeProvider>
  );
};


export default App;
