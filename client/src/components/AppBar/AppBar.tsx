import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar as Bar, Toolbar, Typography, IconButton, useScrollTrigger, Slide } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import Drawer from 'components/Drawer';
import Link from 'components/Link';
import { useHashMatch, useBreakpointChanged } from 'hooks';
import { HASHES, ROUTES } from 'utils/urls';

interface StyleProps {
  height: number;
}
const useStyles = makeStyles((theme: Theme) => ({
  appBar: {},
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
  },
  menuButton: {
    margin: theme.spacing(0, 1),
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

interface IAppBarProps {
  children?: React.ReactNode;
}

/**
 * The app bar that appears on top of the page
 */
const AppBar = ({ children }: IAppBarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const classes = useStyles({ height });
  const history = useHistory();
  const drawerOpen = useHashMatch(HASHES.DRAWER);
  const trigger = useScrollTrigger();

  const breakpoints = useBreakpointChanged();

  const handleDrawerClose = () => {
    history.goBack();
  };

  const handleDrawerOpen = () => {
    history.push(HASHES.DRAWER);
  };

  useEffect(() => {
    setTimeout(() => {
      if (ref && ref.current) {
        setHeight(ref.current.clientHeight);
      }
    }, 300);
  }, [ref, breakpoints]);

  return (
    <div className={classes.appBar}>
      <Slide appear={false} direction="down" in={!trigger}>
        <Bar>
          <div ref={ref}>
            <Toolbar variant="dense" className={classes.toolbar} disableGutters>
              <div className={classes.leftContent}>
                <IconButton onClick={handleDrawerOpen} className={classes.menuButton}>
                  <MenuIcon />
                </IconButton>
                <Link to={ROUTES.HOME} className={classes.link}>
                  <Typography variant="h5" component="h1" className={classes.title}>
                    AoS Statshammer
                  </Typography>
                </Link>
              </div>
              {children}
            </Toolbar>
          </div>
        </Bar>
      </Slide>
      <Drawer open={drawerOpen} onClose={handleDrawerClose} />
      <div className={classes.offset} />
    </div>
  );
};

export default AppBar;
