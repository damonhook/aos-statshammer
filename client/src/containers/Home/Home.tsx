import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import StoreSubscriber from 'components/StoreSubscriber';
import React, { useEffect } from 'react';
import { scrollToTop, setAutoScrollEnabled } from 'utils/scrollIntoView';

import DesktopHome from './DesktopHome';
import MobileHome from './MobileHome';

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
      {mobile ? <MobileHome /> : <DesktopHome />}
    </div>
  );
};

export default Home;
