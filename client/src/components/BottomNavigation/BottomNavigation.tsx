import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { BottomNavigation as Navigation, BottomNavigationAction as NavigationItem } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Home, BarChart, Info, Timeline as TimelineIcon } from '@material-ui/icons';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import { IStore } from 'types/store';
import { ROUTES } from 'utils/urls';

const useStyles = makeStyles((theme: Theme) => ({
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar,
    boxShadow: theme.palette.type === 'dark' ? theme.shadows[20] : theme.shadows[10],
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  item: {
    '&:disabled': {
      color: theme.palette.action.disabledBackground,
    },
  },
}));

const mapStateToProps = (state: IStore) => ({
  numUnits: state.units.length,
});

const connector = connect(mapStateToProps);
interface BottomNavigationProps extends ConnectedProps<typeof connector> {}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ numUnits }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const simulationsDisabled = numUnits <= 0;

  const handleMainClick = () => {
    history.push(ROUTES.HOME);
  };

  const handleStatsClick = () => {
    history.push(ROUTES.STATS);
  };

  const handleSimClick = () => {
    history.push(ROUTES.SIMULATIONS);
  };

  const handleAboutClick = () => {
    history.push(ROUTES.ABOUT);
  };

  let activeIndex = 0;
  if (matchPath(location.pathname, { path: ROUTES.STATS })) activeIndex = 1;
  if (matchPath(location.pathname, { path: ROUTES.SIMULATIONS })) activeIndex = 2;
  if (matchPath(location.pathname, { path: ROUTES.ABOUT })) activeIndex = 3;

  return (
    <Navigation showLabels className={classes.nav} value={activeIndex}>
      <NavigationItem label="Home" icon={<Home />} onClick={handleMainClick} />
      <NavigationItem label="Stats" icon={<BarChart />} onClick={handleStatsClick} />
      <NavigationItem
        label="Simulations"
        icon={<TimelineIcon />}
        onClick={handleSimClick}
        disabled={simulationsDisabled}
        className={classes.item}
      />
      <NavigationItem label="About" icon={<Info />} onClick={handleAboutClick} />
    </Navigation>
  );
};

export default connector(BottomNavigation);
