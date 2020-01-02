import React from 'react';
import { connect } from 'react-redux';
import {
  BottomNavigation as Navigation,
  BottomNavigationAction as NavigationItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Home, BarChart } from '@material-ui/icons';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import { IStore } from 'types/store';

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

interface BottomNavigationProps {
  numUnits: number;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ numUnits }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const advancedDisabled = numUnits <= 0;

  const handleMainClick = () => {
    history.push('/');
  };

  const handleAdvancedClick = () => {
    history.push('/advanced');
  };

  const activeIndex = matchPath(location.pathname, { path: '/advanced' }) ? 1 : 0;

  return (
    <Navigation showLabels className={classes.nav} value={activeIndex}>
      <NavigationItem label="Main" icon={<Home />} onClick={handleMainClick} />
      <NavigationItem
        label="Advanced"
        icon={<BarChart />}
        onClick={handleAdvancedClick}
        disabled={advancedDisabled}
        className={classes.item}
      />
    </Navigation>
  );
};

const mapStateToProps = (state: IStore) => ({
  numUnits: state.units.length,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default connect(mapStateToProps, null, mergeProps)(BottomNavigation);
