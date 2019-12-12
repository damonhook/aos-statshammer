import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Menu, MenuItem, IconButton, Divider,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import clsx from 'clsx';


const useStyles = makeStyles({
  menu: {},
});


/**
 * A menu component with the various options
 */
const ControlMenu = ({
  onEdit, onDelete, onCopy, extraItems, size, className,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItemClick = (action) => {
    if (typeof action !== 'string') {
      action();
    }
    handleClose();
  };

  const hasDivider = (onEdit || onCopy || onDelete) && (extraItems && extraItems.length);

  return (
    <div className={clsx(classes.menu, className)}>
      <IconButton onClick={handleClick} size={size}>
        <MoreVert />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {onEdit && <MenuItem onClick={() => menuItemClick(onEdit)}>Edit</MenuItem>}
        {onCopy && <MenuItem onClick={() => menuItemClick(onCopy)} disabled={onCopy === 'disabled'}>Copy</MenuItem>}
        {onDelete && <MenuItem onClick={() => menuItemClick(onDelete)}>Delete</MenuItem>}
        {hasDivider && <Divider />}
        {extraItems && extraItems.map(({ name, onClick, disabled }) => (
          <MenuItem onClick={() => menuItemClick(onClick)} key={name} disabled={disabled}>
            {name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

ControlMenu.defaultProps = {
  onEdit: null,
  onDelete: null,
  onCopy: null,
  extraItems: null,
  className: null,
  size: 'medium',
};

ControlMenu.propTypes = {
  /** A function to call when edit button is clicked */
  onEdit: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** A function to call when delete button is clicked */
  onDelete: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** A function to call when copy button is clicked */
  onCopy: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** An array of extra commands that will be placed in the control menu */
  extraItems: PropTypes.arrayOf(PropTypes.object),
  /** CSS classname to give the component */
  className: PropTypes.string,
  /** The size of the menu component */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default ControlMenu;
