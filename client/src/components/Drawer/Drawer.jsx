import React from 'react';
import PropTypes from 'prop-types';
import {
  SwipeableDrawer as AppDrawer, List, Typography, Divider, useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Link from 'components/Link';
import { useHistory } from 'react-router-dom';
import { grey } from '@material-ui/core/colors';
import HomeItem from './items/HomeItem';
import ClearUnitsItem from './items/ClearUnitsItem';
import ImportUnitItem from './items/ImportUnitItem';
import AdvancedStatsItem from './items/AdvancedStatsItem';
import ToggleDarkModeItem from './items/ToggleDarkModeItem';
import SocialItems from './items/SocialItems';
import ToggleGraphListItem from './items/ToggleGraphListItem';
import PdfDownloadItem from './items/PdfDownloadItem';

const useStyles = makeStyles((theme) => ({
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

const Drawer = ({ open, onClose, page }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const onSwipeOpen = () => {
    history.push('#menu');
  };

  return (
    <AppDrawer
      open={open}
      onOpen={onSwipeOpen}
      variant="temporary"
      anchor="left"
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <Link to="/" replace>
        <Typography variant="h6" className={classes.title}>AoS Statshammer</Typography>
      </Link>
      <Divider />
      <List className={classes.list}>
        <HomeItem />
        <AdvancedStatsItem />
        <PdfDownloadItem />
        <Divider className={classes.divider} variant="middle" />
        <ToggleDarkModeItem />
        {page === 'home' && !mobile && <ToggleGraphListItem />}
        {page === 'home' && (
          <>
            <ClearUnitsItem />
            <ImportUnitItem onClick={onClose} />
          </>
        )}
        <Divider className={classes.divider} variant="middle" />
        <SocialItems />
        <Divider className={classes.divider} variant="middle" />
        <Typography variant="caption" className={classes.version}>v0.6.0</Typography>
      </List>
    </AppDrawer>
  );
};

Drawer.defaultProps = {
  page: 'home',
};

Drawer.propTypes = {
  page: PropTypes.oneOf(['home', 'advanced']),
};

export default Drawer;
