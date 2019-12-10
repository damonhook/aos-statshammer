import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from 'components/AppBar';
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

const AppContentWrapper = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.app}>
      <AppBar title="AoS Statshammer" />
      <StoreSubscriber />
      {mobile
        ? <MobileAppContent className={classes.container} />
        : <DesktopAppContent className={classes.container} />}
      <Notifications />
      <Footer />
    </div>
  );
};


export default AppContentWrapper;
