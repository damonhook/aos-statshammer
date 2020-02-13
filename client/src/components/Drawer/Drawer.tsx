import { Divider, List, SwipeableDrawer as AppDrawer, Typography, useMediaQuery } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { GetApp, Home, Info, Timeline } from '@material-ui/icons';
import { useHashMatch, useRouteFind } from 'hooks';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { HASHES, ROUTES } from 'utils/urls';

import DrawerLogo from './DrawerLogo';
import ClearTargetItem from './items/ClearTargetItem';
import ClearUnitsItem from './items/ClearUnitsItem';
import ImportUnitItem from './items/ImportUnitItem';
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

  const open = useHashMatch(HASHES.DRAWER);
  const [, , page] = useRouteFind(Object.values(ROUTES));
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const hasRail = useMediaQuery(theme.breakpoints.only('md'));

  const onSwipeOpen = () => {
    history.push(HASHES.DRAWER);
  };

  const handleClose = () => {
    history.goBack();
  };

  if (lg && open) {
    handleClose();
  }

  const isHome = [ROUTES.HOME, ROUTES.TARGET, ROUTES.STATS].includes(page);

  return (
    <>
      {hasRail && <Rail />}
      <AppDrawer
        open={open}
        onOpen={onSwipeOpen}
        variant={lg ? 'permanent' : 'temporary'}
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
          />
          <MenuLinkItem
            to={ROUTES.PDF}
            label="Download PDF"
            icon={<GetApp />}
            selected={page === ROUTES.PDF}
          />
          <MenuLinkItem to={ROUTES.ABOUT} label="About" icon={<Info />} selected={page === ROUTES.ABOUT} />
          <Divider className={classes.divider} variant="middle" />
          <ToggleDarkModeItem />
          {isHome && !mobile && <ToggleGraphListItem />}
          {isHome && (
            <>
              <ClearUnitsItem />
              <ImportUnitItem onClick={handleClose} />
              <ClearTargetItem />
            </>
          )}
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
