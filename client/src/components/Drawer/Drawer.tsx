import { Divider, List, SwipeableDrawer as AppDrawer, Typography, useMediaQuery } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { GetApp, Home, ImportExport, Info, Timeline } from '@material-ui/icons';
import { useHashMatch, useRouteFind } from 'hooks';
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addUnitEnabledSelector, numUnitsSelector, useRailLgSelector } from 'store/selectors';
import { HASHES, ROUTES, UNIT_SUBROUTES } from 'utils/urls';

import DrawerLogo from './DrawerLogo';
import ClearTargetItem from './items/ClearTargetItem';
import ClearUnitsItem from './items/ClearUnitsItem';
import SocialItems from './items/SocialItems';
import ToggleDarkModeItem from './items/ToggleDarkModeItem';
import ToggleGraphListItem from './items/ToggleGraphListItem';
import MenuLinkItem from './MenuLinkItem';
import Rail from './Rail';

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: theme.mixins.drawer.width,
  },
  docked: {
    width: theme.mixins.drawer.width,
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  list: {
    width: '100%',
  },
  version: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: theme.spacing(2),
    color: grey[500],
  },
}));

const Drawer = () => {
  const theme = useTheme();
  const history = useHistory();
  const classes = useStyles();

  const numUnits = useSelector(numUnitsSelector);
  const useRailLg = useSelector(useRailLgSelector);
  const adUnitEnabled = useSelector(addUnitEnabledSelector);

  const open = useHashMatch(HASHES.DRAWER);
  const [, , page] = useRouteFind(Object.values(ROUTES));
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const md = useMediaQuery(theme.breakpoints.only('md'));

  const onSwipeOpen = () => {
    history.push(HASHES.DRAWER);
  };

  const handleClose = useCallback(() => {
    if (history.location.hash === HASHES.DRAWER) {
      history.goBack();
    }
  }, [history]);

  useEffect(() => {
    if (lg) handleClose();
  }, [handleClose, lg]);

  const isHome = [ROUTES.HOME, ROUTES.TARGET, ROUTES.STATS].includes(page);

  const isPermanent = lg && !useRailLg;
  const useRail = md || (lg && useRailLg);

  return (
    <>
      {useRail && <Rail />}
      <AppDrawer
        open={open}
        onOpen={onSwipeOpen}
        variant={isPermanent ? 'permanent' : 'temporary'}
        anchor="left"
        onClose={handleClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        className={classes.drawer}
        classes={{
          paperAnchorLeft: classes.docked,
        }}
      >
        <DrawerLogo />
        <Divider />
        <List className={classes.list}>
          <MenuLinkItem to={ROUTES.HOME} label="Home" icon={<Home />} selected={isHome} />
          <MenuLinkItem
            to={ROUTES.SIMULATIONS}
            label="Simulations"
            icon={<Timeline />}
            selected={page === ROUTES.SIMULATIONS}
            disabled={numUnits <= 0}
          />
          <MenuLinkItem
            to={ROUTES.PDF}
            label="Download PDF"
            icon={<GetApp />}
            selected={page === ROUTES.PDF}
            disabled={numUnits <= 0}
          />
          <MenuLinkItem to={ROUTES.ABOUT} label="About" icon={<Info />} selected={page === ROUTES.ABOUT} />
          {isHome && (
            <MenuLinkItem
              to={UNIT_SUBROUTES.IMPORT}
              label="Import Unit"
              icon={<ImportExport />}
              disabled={!adUnitEnabled}
            />
          )}
          <Divider className={classes.divider} variant="middle" />
          <ToggleDarkModeItem />
          {isHome && !mobile && <ToggleGraphListItem />}
          {isHome && <ClearUnitsItem />}
          {isHome && <ClearTargetItem />}
          <Divider className={classes.divider} variant="middle" />
          <SocialItems />
          <Divider className={classes.divider} variant="middle" />
          {process.env.REACT_APP_VERSION && (
            <Typography variant="caption" className={classes.version}>
              {`v${process.env.REACT_APP_VERSION}`}
            </Typography>
          )}
        </List>
      </AppDrawer>
    </>
  );
};

export default Drawer;
