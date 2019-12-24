import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { BarChart } from '@material-ui/icons';
import { toggleDesktopGraphList } from 'actions/config.action';
import { connect } from 'react-redux';

const ToggleGraphListItem = ({ toggleDesktopGraphList }) => {
  const handleClick = () => {
    toggleDesktopGraphList();
  };

  return (
    <ListItem button onClick={handleClick}>
      <ListItemIcon><BarChart /></ListItemIcon>
      <ListItemText primary="Toggle Graph List/Tabs" />
    </ListItem>
  );
};

ToggleGraphListItem.propTypes = {
  /** A function to call to toggle the desktop graph list */
  toggleDesktopGraphList: PropTypes.func.isRequired,
};

export default connect(null, { toggleDesktopGraphList })(ToggleGraphListItem);
