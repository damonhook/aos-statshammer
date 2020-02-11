import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import StoreSubscriber from 'components/StoreSubscriber';
import { setAutoScrollEnabled, scrollToTop } from 'utils/scrollIntoView';
import DesktopAppContent from './DesktopAppContent';
import MobileAppContent from './MobileAppContent';

const useStyles = makeStyles(() => ({
  home: {
    flex: 1,
  },
}));

const AppContentWrapper: React.FC = () => {
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
      {mobile ? <MobileAppContent /> : <DesktopAppContent />}
    </div>
  );
};

export default AppContentWrapper;
