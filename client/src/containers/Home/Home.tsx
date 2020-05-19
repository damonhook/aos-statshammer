import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Loader from 'components/Loader';
import StoreSubscriber from 'components/StoreSubscriber';
import React, { lazy, Suspense, useEffect } from 'react';
import { scrollToTop, setAutoScrollEnabled } from 'utils/scrollIntoView';

const DesktopHome = lazy(() => import('./DesktopHome'));
const MobileHome = lazy(() => import('./MobileHome'));

const useStyles = makeStyles(() => ({
  home: {
    flex: 1,
  },
}));

const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setAutoScrollEnabled(false);
    setTimeout(() => {
      scrollToTop(true);
    }, 250);
    setTimeout(() => {
      setAutoScrollEnabled(true);
    }, 1000);
  }, []);

  return (
    <div className={classes.home}>
      <StoreSubscriber />
      <Suspense fallback={<Loader />}>{mobile ? <MobileHome /> : <DesktopHome />}</Suspense>
    </div>
  );
};

export default Home;
