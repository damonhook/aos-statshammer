import { BottomNavigation as Navigation, BottomNavigationAction as NavigationItem } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { BarChart, Home, Info, Timeline as TimelineIcon } from '@material-ui/icons';
import { useBreakpointChanged, useRouteFind } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IStore } from 'types/store';
import { ROUTES } from 'utils/urls';

interface IStyleProps {
  height: number;
}
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
  offset: ({ height }: IStyleProps) => ({
    marginTop: height,
  }),
  item: {
    '&:disabled': {
      color: theme.palette.action.disabledBackground,
    },
  },
}));

const BottomNavigation = () => {
  const history = useHistory();
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const classes = useStyles({ height });

  const routes = [ROUTES.HOME, ROUTES.STATS, ROUTES.SIMULATIONS, ROUTES.ABOUT];
  const [index] = useRouteFind(routes);

  const breakpoints = useBreakpointChanged();
  const numUnits = useSelector((state: IStore) => state.units.length);

  const handleChange = (event: any, newValue: number) => {
    history.push(routes[newValue]);
  };

  useEffect(() => {
    setTimeout(() => {
      if (ref && ref.current) {
        setHeight(ref.current.clientHeight);
      }
    }, 150);
  }, [ref, breakpoints]);

  return (
    <>
      <div className={classes.offset} />
      <div ref={ref} className={classes.nav}>
        <Navigation value={index} onChange={handleChange} showLabels>
          <NavigationItem label="Home" icon={<Home />} className={classes.item} />
          <NavigationItem label="Stats" icon={<BarChart />} className={classes.item} />
          <NavigationItem
            label="Simulations"
            icon={<TimelineIcon />}
            disabled={numUnits <= 0}
            className={classes.item}
          />
          <NavigationItem label="About" icon={<Info />} className={classes.item} />
        </Navigation>
      </div>
    </>
  );
};

export default BottomNavigation;
