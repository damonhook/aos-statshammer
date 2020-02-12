import {
  AppBar as Bar,
  Grid,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Menu as MenuIcon } from '@material-ui/icons';
import Link from 'components/Link';
import SimulationTabControls from 'components/SimulationTabControls';
import { useBreakpointChanged, useRouteFind } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { HASHES, ROUTES } from 'utils/urls';

import { IStore } from '../../types/store';

interface StyleProps {
  height: number;
}
const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.mixins.drawer.width,
      width: `calc(100% - ${theme.mixins.drawer.width}px)`,
    },
  },
  offset: ({ height }: StyleProps) => ({
    marginTop: height,
  }),
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'initial',
  },
  leftContent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: theme.spacing(1),
  },
  menuButton: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  title: {
    padding: theme.spacing(2, 0),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
}));

/**
 * The app bar that appears on top of the page
 */
const AppBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [, , page] = useRouteFind(Object.values(ROUTES));

  const classes = useStyles({ height });
  const history = useHistory();
  const trigger = useScrollTrigger();

  const breakpoints = useBreakpointChanged();
  const simulationsPending = useSelector((state: IStore) => state.simulations.pending);

  const handleDrawerOpen = () => {
    history.push(HASHES.DRAWER);
  };

  useEffect(() => {
    setTimeout(() => {
      if (ref && ref.current) {
        setHeight(ref.current.clientHeight);
      }
    }, 200);
  }, [ref, breakpoints]);

  return (
    <div>
      <Slide appear={false} direction="down" in={!trigger}>
        <Bar className={classes.appBar}>
          <div ref={ref}>
            <Toolbar variant="dense" className={classes.toolbar} disableGutters>
              <div className={classes.leftContent}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <IconButton onClick={handleDrawerOpen} className={classes.menuButton}>
                      <MenuIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Link to={ROUTES.HOME} className={classes.link}>
                      <Typography variant="h5" component="h1" className={classes.title}>
                        AoS Statshammer
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </div>
              {page === ROUTES.SIMULATIONS && <SimulationTabControls pending={simulationsPending} />}
            </Toolbar>
          </div>
        </Bar>
      </Slide>
      <div className={classes.offset} />
    </div>
  );
};

export default AppBar;
