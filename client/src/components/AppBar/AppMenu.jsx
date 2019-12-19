import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Menu, IconButton, Button, useMediaQuery,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { clearAllUnits } from 'actions/units.action';
import { connect } from 'react-redux';
import ConfirmationDialog from 'components/ConfirmationDialog';
import { Route } from 'react-router-dom';
import { addNotification } from 'actions/notifications.action';
import PdfDownloadItem from './PdfDownloadItem';
import ToggleDarkModeItem from './ToggleDarkModeItem';
import ClearUnitsItem from './ClearUnitsItem';
import ToggleGraphListItem from './ToggleGraphListItem';
import ImportUnitItem from './ImportUnitItem';

const useStyles = makeStyles((theme) => ({
  menu: {},
  icon: {
    color: theme.palette.primary.contrastText,
  },
}));

/**
 * A menu list containing various actions that can be performed
 */
const AppMenu = ({ clearAllUnits, addNotification }) => {
  const classes = useStyles();
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
   * Handle the case when the confirm option is selected from the clear all units dialog
   */
  const clearAllConfirmed = useCallback(() => {
    menuItemClick(clearAllUnits);
    addNotification({ message: 'All units cleared', variant: 'info' });
  }, [addNotification, clearAllUnits, menuItemClick]);

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
        <ClearUnitsItem onClick={handleMenuClose} />
        <ToggleDarkModeItem onClick={handleMenuClose} />
        {!mobile && <ToggleGraphListItem onClick={handleMenuClose} />}
        <ImportUnitItem onClick={handleMenuClose} />
        <PdfDownloadItem onClick={handleMenuClose} />
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
};

export default connect(null, { clearAllUnits, addNotification })(AppMenu);
