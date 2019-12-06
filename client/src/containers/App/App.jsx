import React from 'react';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import AppBar from 'components/AppBar';
import { basicTheme } from 'themes';
import { useMediaQuery } from '@material-ui/core';
import StoreSubscriber from 'components/StoreSubscriber';
import Footer from 'components/Footer';
import Notifications from 'components/Notifications';
import DesktopAppContent from './DesktopAppContent';
import MobileAppContent from './MobileAppContent';


const useStyles = makeStyles(() => ({
  app: {
    fontFamily: '"Roboto", sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    flex: 1,
  },
}));

const App = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={basicTheme}>
      <div className={classes.app}>
        <AppBar title="AoS Statshammer" />
        <StoreSubscriber />
        {mobile
          ? <MobileAppContent className={classes.container} />
          : <DesktopAppContent className={classes.container} />}
        <Notifications />
        <Footer />
      </div>
    </ThemeProvider>
  );
};


export default App;
