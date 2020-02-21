import { makeStyles } from '@material-ui/core/styles';
import { RoutedTabs } from 'components/Tabbed';
import Stats from 'containers/Stats';
import Target from 'containers/Target';
import Units from 'containers/Units';
import React from 'react';
import { ROUTES } from 'utils/urls';

const useStyles = makeStyles(() => ({
  mobileHome: {
    display: 'flex',
    flex: 1,
  },
  tabs: {
    marginTop: 0,
    maxWidth: '100vw',
  },
  tab: {
    padding: '.5em',
  },
}));

const MobileAppContent = () => {
  const classes = useStyles();

  return (
    <div className={classes.mobileHome}>
      <RoutedTabs
        className={classes.tabs}
        tabNames={['Units', 'Target', 'Stats']}
        tabContent={[
          <Units className={classes.tab} />,
          <Target className={classes.tab} />,
          <Stats className={classes.tab} />,
        ]}
        tabRoutes={[ROUTES.HOME, ROUTES.TARGET, ROUTES.STATS]}
      />
    </div>
  );
};

export default MobileAppContent;
