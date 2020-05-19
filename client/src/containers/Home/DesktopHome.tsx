import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { RoutedTabs } from 'components/Tabbed';
import Stats from 'containers/Stats';
import Target from 'containers/Target';
import Units from 'containers/Units';
import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ROUTES } from 'utils/urls';

const useStyles = makeStyles((theme) => ({
  desktopHome: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  tabs: {
    marginTop: 0,
    height: '100%',
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

  return (
    <div className={classes.desktopHome}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <RoutedTabs
            className={classes.tabs}
            tabNames={['Units', 'Target']}
            tabContent={[<Units className={classes.tab} />, <Target className={classes.tab} />]}
            tabRoutes={[ROUTES.HOME, ROUTES.TARGET]}
          />
        </Grid>
        <Grid item xs={6}>
          <div className={classes.statsContent}>
            <Stats />
          </div>
        </Grid>
      </Grid>
      <Switch>
        <Redirect exact from="/stats" to="/" />
      </Switch>
    </div>
  );
};

export default DesktopHome;
