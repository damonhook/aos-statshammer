import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { RoutedTabs } from 'components/Tabbed';
import Stats from 'containers/Stats';
import Target from 'containers/Target';
import Units from 'containers/Units';
import React from 'react';
import { ROUTES } from 'utils/urls';

const useStyles = makeStyles(theme => ({
  desktopHome: {
    display: 'flex',
    flexDirection: 'row',
  },
  tabs: {
    marginTop: 0,
  },
  tab: {
    padding: theme.spacing(2, 0, 2, 2),
  },
  statsContent: {
    paddingTop: theme.spacing(2),
  },
}));

const DesktopHome = () => {
  const classes = useStyles();
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div className={classes.desktopHome}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <RoutedTabs
            className={classes.tabs}
            tabNames={['Units', 'Target']}
            tabContent={[<Units className={classes.tab} />, <Target className={classes.tab} />]}
            tabRoutes={[ROUTES.HOME, ROUTES.TARGET]}
            usePortal
          />
          {/* <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          >
            <div ref={ref} style={{ position: 'absolute', width: '100%', height: '100%' }} />
          </div> */}
        </Grid>
        <Grid item xs={6}>
          <div className={classes.statsContent}>
            <Stats />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default DesktopHome;
