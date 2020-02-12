import { Divider, List, SwipeableDrawer as AppDrawer, Typography, useMediaQuery } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { LogoIcon } from 'components/Icons';
import Link from 'components/Link';
import { useHashMatch, useRouteFind } from 'hooks';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { HASHES, ROUTES } from 'utils/urls';

import AboutItem from './items/AboutItem';
import AdvancedStatsItem from './items/AdvancedStatsItem';
import ClearTargetItem from './items/ClearTargetItem';
import ClearUnitsItem from './items/ClearUnitsItem';
import HomeItem from './items/HomeItem';
import ImportUnitItem from './items/ImportUnitItem';
import PdfDownloadItem from './items/PdfDownloadItem';
import SocialItems from './items/SocialItems';
import ToggleDarkModeItem from './items/ToggleDarkModeItem';
import ToggleGraphListItem from './items/ToggleGraphListItem';

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: theme.mixins.drawer.width,
    },
  },
  docked: {
    width: theme.mixins.drawer.width,
  },
  title: {
    padding: theme.spacing(2, 2),
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  list: {
    width: '100%',
  },
  logo: {
    margin: theme.spacing(1, 0, 1.5),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '3.5rem',
    display: 'flex',
  },
  version: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: theme.spacing(2),
    color: grey[500],
  },
}));

const Drawer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const open = useHashMatch(HASHES.DRAWER);
  const [, , page] = useRouteFind(Object.values(ROUTES));
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));

  const onSwipeOpen = () => {
    history.push(HASHES.DRAWER);
  };

  const handleClose = () => {
    history.goBack();
  };

  return (
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
      <Link to={ROUTES.HOME} replace className={classes.logo}>
        <LogoIcon color="primary" fontSize="inherit" />
      </Link>
      <Divider />
      <List className={classes.list}>
        <HomeItem />
        <AdvancedStatsItem />
        <PdfDownloadItem />
        <AboutItem />
        <Divider className={classes.divider} variant="middle" />
        <ToggleDarkModeItem />
        {page === ROUTES.HOME && !mobile && <ToggleGraphListItem />}
        {page === ROUTES.HOME && (
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
  );
};

export default Drawer;
