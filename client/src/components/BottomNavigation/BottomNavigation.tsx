import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { BottomNavigation as Navigation, BottomNavigationAction as NavigationItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Home, BarChart } from '@material-ui/icons';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import { IStore } from 'types/store';
import { getRoute, EPages } from 'types/routes';

const useStyles = makeStyles(theme => ({
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar,
    boxShadow: theme.palette.type === 'dark' ? theme.shadows[20] : theme.shadows[10],
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
    history.push(getRoute(EPages.HOME));
  };

  const handleSimClick = () => {
    history.push(getRoute(EPages.SIMULATIONS));
  };

  const activeIndex = matchPath(location.pathname, { path: getRoute(EPages.SIMULATIONS) }) ? 1 : 0;

  return (
    <Navigation showLabels className={classes.nav} value={activeIndex}>
      <NavigationItem label="Main" icon={<Home />} onClick={handleMainClick} />
      <NavigationItem
        label="Simulations"
        icon={<BarChart />}
        onClick={handleSimClick}
        disabled={simulationsDisabled}
        className={classes.item}
      />
    </Navigation>
  );
};

export default connector(BottomNavigation);
