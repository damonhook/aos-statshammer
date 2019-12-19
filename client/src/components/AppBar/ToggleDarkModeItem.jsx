import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Typography } from '@material-ui/core';
import { BrightnessMedium } from '@material-ui/icons';
import { toggleDarkMode } from 'actions/config.action';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  menuItemIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ToggleDarkModeItem = ({ onClick, toggleDarkMode }) => {
  const classes = useStyles();

  const handleClick = () => {
    onClick();
    toggleDarkMode();
  };

  return (
    <MenuItem onClick={handleClick}>
      <BrightnessMedium className={classes.menuItemIcon} />
      <span>Toggle Dark Mode&nbsp;</span>
    </MenuItem>
  );
};

ToggleDarkModeItem.propTypes = {
  /** A callback function to call when the menu item is clicked */
  onClick: PropTypes.func.isRequired,
  /** A function to call to toggle dark/light themes */
  toggleDarkMode: PropTypes.func.isRequired,
};

export default connect(null, { toggleDarkMode })(ToggleDarkModeItem);
