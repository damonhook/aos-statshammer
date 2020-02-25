import {
  AppBar as Bar,
  Grid,
  IconButton,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useScrollTrigger,
} from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { ImportExport, Menu as MenuIcon } from '@material-ui/icons';
import clsx from 'clsx';
import Link from 'components/Link';
import SimulationTabControls from 'components/SimulationTabControls';
import { useBreakpointChanged, useRouteFind } from 'hooks';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useRailLgSelector } from 'store/selectors';
import { configStore } from 'store/slices';
import { HASHES, ROUTES } from 'utils/urls';

import { IStore } from '../../types/store';

interface StyleProps {
  height: number;
}
const useStyles = makeStyles((theme: Theme) => ({
  largeMargin: {
    marginLeft: theme.mixins.drawer.width,
    width: `calc(100% - ${theme.mixins.drawer.width}px)`,
  },
  railMargin: {
    marginLeft: theme.mixins.drawer.miniWidth,
    width: `calc(100% - ${theme.mixins.drawer.miniWidth}px)`,
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
  content: {
    padding: theme.spacing(0, 1),
  },
  menuButton: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
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
  const dispatch = useDispatch();

  const history = useHistory();
  const trigger = useScrollTrigger();
  const classes = useStyles({ height });

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const useRailLg = useSelector(useRailLgSelector);

  const breakpoints = useBreakpointChanged();
  const simulationsPending = useSelector((state: IStore) => state.simulations.pending);

  const leftNavVariant = useMemo(() => {
    if (lg) return useRailLg ? 'rail' : 'large';
    if (md) return 'rail';
    return 'none';
  }, [lg, md, useRailLg]);

  const handleDrawerOpen = () => {
    if (lg) {
      dispatch(configStore.actions.toggleUseRailLg());
    } else {
      history.push(HASHES.DRAWER);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (ref && ref.current) setHeight(ref.current.clientHeight);
    }, 200);
  }, [ref, breakpoints]);

  const isHome = [ROUTES.HOME, ROUTES.TARGET, ROUTES.STATS].includes(page);

  return (
    <div>
      <Slide appear={false} direction="down" in={!trigger}>
        <Bar
          className={clsx({
            [classes.largeMargin]: leftNavVariant === 'large',
            [classes.railMargin]: leftNavVariant === 'rail',
          })}
        >
          <div ref={ref}>
            <Toolbar variant="dense" className={classes.toolbar} disableGutters>
              <Grid container spacing={1} alignItems="center" className={classes.content}>
                <Grid item>
                  <IconButton onClick={handleDrawerOpen} className={classes.menuButton}>
                    <MenuIcon />
                  </IconButton>
                </Grid>
                <Grid item style={{ flex: 1 }}>
                  <Link to={ROUTES.HOME} className={classes.link}>
                    <Typography variant="h5" component="h1" className={classes.title}>
                      AoS Statshammer
                    </Typography>
                  </Link>
                </Grid>
                {isHome && (
                  <Grid item>
                    <Tooltip title="Import Unit">
                      <Link to={ROUTES.IMPORT}>
                        <IconButton>
                          <ImportExport />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  </Grid>
                )}
              </Grid>
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
