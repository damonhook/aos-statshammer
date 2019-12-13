import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Menu, MenuItem, IconButton, Typography, Button, useMediaQuery,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { clearAllUnits, addUnit } from 'actions/units.action';
import { toggleDarkMode, toggleDesktopGraphList } from 'actions/config.action';
import { connect } from 'react-redux';
import ConfirmationDialog from 'components/ConfirmationDialog';
import { useHistory, Route } from 'react-router-dom';
import { addNotification } from 'actions/notifications.action';
import Uploader from 'components/Uploader';
import { addUnitEnabled } from 'utils/unitHelpers';

const useStyles = makeStyles((theme) => ({
  menu: {},
  icon: {
    color: theme.palette.primary.contrastText,
  },
  caption: {
    paddingBottom: theme.spacing(1),
  },
}));

/**
 * A menu list containing various actions that can be performed
 */
const AppMenu = ({
  clearAllUnits, addNotification, toggleDarkMode, addUnit, toggleDesktopGraphList,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);
  const confirmPath = '/units/confirm';

  /**
   * Handle the on click event for the menu button (Open the menu)
   * @param {object} event The event object passed from the DOM element caller
   */
  const handleMenuClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  /** Handle closing the menu */
  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  /**
   * Handle the onclick event for any given menu item
   * @param {func} action The function to call for the given menu item
   */
  const menuItemClick = useCallback((action) => {
    action();
    handleMenuClose();
  }, [handleMenuClose]);

  /**
   * Change the URL bar to a new location. This is used to display dialog boxes that
   * retains proper navigation
   * @param {string} newloc the new URL to set
   */
  const setLocation = useCallback((newloc) => {
    handleMenuClose();
    history.push(newloc);
  }, [handleMenuClose, history]);

  /**
   * Handle the case when the confirm option is selected from the clear all units dialog
   */
  const clearAllConfirmed = useCallback(() => {
    menuItemClick(clearAllUnits);
    addNotification({ message: 'All units cleared', variant: 'info' });
  }, [addNotification, clearAllUnits, menuItemClick]);

  /** Is the upload menu item disabled or not */
  const isUploadDisabled = !addUnitEnabled();

  /** The function to call when a file upload happens.
   * In this case that would be importing the uploaded unit data
   * @param {object} data the JSON from the uploaded unit
   * */
  const onUnitUpload = useCallback((data) => {
    if (data && data.name && data.weapon_profiles) {
      addNotification({ message: 'Successfully imported unit', variant: 'success' });
      addUnit(data.name, data.weapon_profiles);
    }
  }, [addNotification, addUnit]);

  return (
    <div className={classes.menu}>
      {mobile
        ? (
          <IconButton onClick={handleMenuClick} size="medium" className={classes.icon}>
            <MoreVert />
          </IconButton>
        )
        : (
          <Button
            onClick={handleMenuClick}
            size="medium"
            className={classes.icon}
            startIcon={<MoreVert />}
          >
            More
          </Button>
        )}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => setLocation(confirmPath)}>Clear Units</MenuItem>
        <MenuItem onClick={() => menuItemClick(toggleDarkMode)}>
          <span>Toggle Dark Mode&nbsp;</span>
          <Typography variant="caption" color="secondary" className={classes.caption}>
            Beta
          </Typography>
        </MenuItem>
        {!mobile && (
          <MenuItem onClick={() => menuItemClick(toggleDesktopGraphList)}>
            Toggle Graph List/Tabs
          </MenuItem>
        )}
        <Uploader
          onUpload={(data) => menuItemClick(() => onUnitUpload(data))}
          disabled={isUploadDisabled}
          component={
            <MenuItem disabled={isUploadDisabled}>Import Unit</MenuItem>
          }
        />
      </Menu>
      <Route path={confirmPath}>
        <ConfirmationDialog
          open
          onConfirm={clearAllConfirmed}
          onClose={handleMenuClose}
          description="Are you sure you want to delete all units"
        />
      </Route>
    </div>
  );
};

AppMenu.propTypes = {
  /** A function to clear all of the current units */
  clearAllUnits: PropTypes.func.isRequired,
  /** A function to call to add a notification to the stack */
  addNotification: PropTypes.func.isRequired,
  /** A function to call to toggle dark/light themes */
  toggleDarkMode: PropTypes.func.isRequired,
  /** A function to call to add a new unit */
  addUnit: PropTypes.func.isRequired,
  /** A function to call to toggle the desktop graph list */
  toggleDesktopGraphList: PropTypes.func.isRequired,
};

export default connect(null, {
  clearAllUnits, addNotification, toggleDarkMode, addUnit, toggleDesktopGraphList,
})(AppMenu);
