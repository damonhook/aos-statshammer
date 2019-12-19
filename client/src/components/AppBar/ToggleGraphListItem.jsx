import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core';
import { BarChart } from '@material-ui/icons';
import { toggleDesktopGraphList } from 'actions/config.action';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  menuItemIcon: {
    marginRight: theme.spacing(1),
  },
  caption: {
    paddingBottom: theme.spacing(1),
  },
}));

const ToggleGraphListItem = ({ onClick, toggleDesktopGraphList }) => {
  const classes = useStyles();

  const handleClick = () => {
    onClick();
    toggleDesktopGraphList();
  };

  return (
    <MenuItem onClick={handleClick}>
      <BarChart className={classes.menuItemIcon} />
      <span>Toggle Graph List/Tabs</span>
    </MenuItem>
  );
};

ToggleGraphListItem.propTypes = {
  /** A callback function to call when the menu item is clicked */
  onClick: PropTypes.func.isRequired,
  /** A function to call to toggle the desktop graph list */
  toggleDesktopGraphList: PropTypes.func.isRequired,
};

export default connect(null, { toggleDesktopGraphList })(ToggleGraphListItem);
