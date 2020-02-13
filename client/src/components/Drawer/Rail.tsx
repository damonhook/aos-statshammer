import { Divider, List, SwipeableDrawer as AppDrawer, useMediaQuery } from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { GetApp, Home, Info, Timeline } from '@material-ui/icons';
import { useRouteFind } from 'hooks';
import React from 'react';
import { ROUTES } from 'utils/urls';

import DrawerLogo from './DrawerLogo';
import ClearTargetItem from './items/ClearTargetItem';
import ClearUnitsItem from './items/ClearUnitsItem';
import ImportUnitItem from './items/ImportUnitItem';
import ToggleDarkModeItem from './items/ToggleDarkModeItem';
import ToggleGraphListItem from './items/ToggleGraphListItem';
import MenuLinkItem from './MenuLinkItem';

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: theme.mixins.drawer.miniWidth,
  },
  docked: {
    width: theme.mixins.drawer.miniWidth,
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  list: {
    width: '100%',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(0.5, 0, 1),
    fontSize: '2.75rem',
  },
}));

const Drawer = () => {
  const theme = useTheme();

  const [, , page] = useRouteFind(Object.values(ROUTES));
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const classes = useStyles();

  const isHome = [ROUTES.HOME, ROUTES.TARGET, ROUTES.STATS].includes(page);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const dummyFunc = () => {};

  return (
    <AppDrawer
      open
      onOpen={dummyFunc}
      onClose={dummyFunc}
      variant="persistent"
      anchor="left"
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
        <MenuLinkItem
          to={ROUTES.HOME}
          label="Home"
          icon={<Home color={isHome ? 'primary' : 'action'} />}
          mini
        />
        <MenuLinkItem
          to={ROUTES.SIMULATIONS}
          label="Simulations"
          icon={<Timeline color={page === ROUTES.SIMULATIONS ? 'primary' : 'action'} />}
          mini
        />
        <MenuLinkItem
          to={ROUTES.PDF}
          label="Download PDF"
          icon={<GetApp color={page === ROUTES.PDF ? 'primary' : 'action'} />}
          mini
        />
        <MenuLinkItem
          to={ROUTES.ABOUT}
          label="About"
          icon={<Info color={page === ROUTES.ABOUT ? 'primary' : 'action'} />}
          mini
        />
        <Divider className={classes.divider} variant="middle" />
        <ToggleDarkModeItem mini />
        {isHome && !mobile && <ToggleGraphListItem mini />}
        {isHome && (
          <>
            <ClearUnitsItem mini />
            <ImportUnitItem mini />
            <ClearTargetItem mini />
          </>
        )}
      </List>
    </AppDrawer>
  );
};

export default Drawer;
