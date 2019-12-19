import React, { useRef, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from 'components/AppBar';
import { useMediaQuery } from '@material-ui/core';
import StoreSubscriber from 'components/StoreSubscriber';
import Footer from 'components/Footer';
import Notifications from 'components/Notifications';
import { setAutoScrollEnabled, scrollToRef } from 'utils/scrollIntoView';
import DesktopAppContent from './DesktopAppContent';
import MobileAppContent from './MobileAppContent';


const useStyles = makeStyles((theme) => ({
  app: {
    fontFamily: '"Roboto", sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background.default,
  },
  container: {
    flex: 1,
  },
}));

const AppContentWrapper = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const contentRef = useRef(null);

  useEffect(() => {
    setAutoScrollEnabled(false);
    setTimeout(() => {
      scrollToRef(contentRef, true);
    }, 500);
    setTimeout(() => {
      setAutoScrollEnabled(true);
    }, 1000);
  }, []);

  return (
    <div className={classes.app} ref={contentRef}>
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
