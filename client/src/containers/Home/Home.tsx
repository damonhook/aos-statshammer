import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import StoreSubscriber from 'components/StoreSubscriber';
import ExportUnit from 'containers/ExportUnit';
import ImportUnit from 'containers/ImportUnit';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { scrollToTop, setAutoScrollEnabled } from 'utils/scrollIntoView';
import { UNIT_SUBROUTES } from 'utils/urls';

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
      <Switch>
        <Route path={UNIT_SUBROUTES.IMPORT} component={ImportUnit} />
        <Route path={UNIT_SUBROUTES.EXPORT} component={ExportUnit} />
        <Route path="/" component={mobile ? MobileHome : DesktopHome} />
      </Switch>
      {/* {mobile ? <MobileHome /> : <DesktopHome />} */}
    </div>
  );
};

export default Home;
