import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { BrightnessMedium as BrightnessMediumIcon } from '@material-ui/icons';
import { toggleDarkMode } from 'actions/config.action';
import { connect } from 'react-redux';

const ToggleDarkModeItem = ({ onClick, toggleDarkMode }) => {
  const handleClick = () => {
    toggleDarkMode();
    if (onClick) onClick();
  };

  return (
    <ListItem button onClick={handleClick}>
      <ListItemIcon><BrightnessMediumIcon /></ListItemIcon>
      <ListItemText primary="Toggle Dark Mode" />
    </ListItem>
  );
};

ToggleDarkModeItem.defaultProps = {
  onClick: null,
};

ToggleDarkModeItem.propTypes = {
  /** A callback function to call when the menu item is clicked */
  onClick: PropTypes.func,
  /** A function to call to toggle dark/light themes */
  toggleDarkMode: PropTypes.func.isRequired,
};

export default connect(null, { toggleDarkMode })(ToggleDarkModeItem);
