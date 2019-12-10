import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Menu, MenuItem, IconButton, Typography,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { clearAllUnits } from 'actions/units.action';
import { toggleDarkMode } from 'actions/config.action';
import { connect } from 'react-redux';
import ConfirmationDialog from 'components/ConfirmationDialog';
import { useHistory, Route } from 'react-router-dom';
import { addNotification } from 'actions/notifications.action';

const useStyles = makeStyles((theme) => ({
  menu: {},
  icon: {
    color: theme.palette.primary.contrastText,
  },
  caption: {
    // marginTop: 'auto',
    paddingBottom: theme.spacing(1),
  },
}));

const AppMenu = ({ clearAllUnits, addNotification, toggleDarkMode }) => {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const confirmPath = '/units/confirm';

  const handleMenuClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const menuItemClick = useCallback((action) => {
    action();
    handleMenuClose();
  }, [handleMenuClose]);

  const setLocation = useCallback((newloc) => {
    handleMenuClose();
    history.push(newloc);
  }, [handleMenuClose, history]);

  const clearAllConfirmed = useCallback(() => {
    menuItemClick(clearAllUnits);
    addNotification({ message: 'All units cleared', variant: 'info' });
  }, [addNotification, clearAllUnits, menuItemClick]);

  return (
    <div className={classes.menu}>
      <IconButton onClick={handleMenuClick} size="medium" className={classes.icon}>
        <MoreVert />
      </IconButton>
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
  clearAllUnits: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default connect(null, { clearAllUnits, addNotification, toggleDarkMode })(AppMenu);
