import React from 'react';
import { SwipeableDrawer as AppDrawer, List, Typography, Divider, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Link from 'components/Link';
import { useHistory } from 'react-router-dom';
import { grey } from '@material-ui/core/colors';
import { HASHES, ROUTES } from 'utils/urls';
import { useRouteFind } from 'hooks';
import HomeItem from './items/HomeItem';
import AboutItem from './items/AboutItem';
import ClearUnitsItem from './items/ClearUnitsItem';
import ImportUnitItem from './items/ImportUnitItem';
import AdvancedStatsItem from './items/AdvancedStatsItem';
import ToggleDarkModeItem from './items/ToggleDarkModeItem';
import SocialItems from './items/SocialItems';
import ToggleGraphListItem from './items/ToggleGraphListItem';
import PdfDownloadItem from './items/PdfDownloadItem';
import ClearTargetItem from './items/ClearTargetItem';

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(2, 2),
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  list: {
    width: 300,
    [theme.breakpoints.down('md')]: {
      width: 250,
    },
  },
  version: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: theme.spacing(2),
    color: grey[500],
  },
}));

interface DrawerProps {
  open: boolean;
  onClose?: () => void;
}

const Drawer = ({ open, onClose }: DrawerProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();
  const [, , page] = useRouteFind(Object.values(ROUTES));

  const onSwipeOpen = () => {
    history.push(HASHES.DRAWER);
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <AppDrawer
      open={open}
      onOpen={onSwipeOpen}
      variant="temporary"
      anchor="left"
      onClose={handleClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <Link to={ROUTES.HOME} replace>
        <Typography variant="h6" className={classes.title}>
          AoS Statshammer
        </Typography>
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
            <ImportUnitItem onClick={onClose} />
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
