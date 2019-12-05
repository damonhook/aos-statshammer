import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Menu, MenuItem, IconButton, Divider,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';


const useStyles = makeStyles({
  menu: {},
});

const ControlMenu = ({
  onEdit, onDelete, onCopy, extraItems, size = 'medium',
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
    action();
    handleClose();
  };

  const hasDivider = (onEdit || onCopy || onDelete) && (extraItems && extraItems.length);

  return (
    <div className={classes.menu}>
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
        {extraItems && extraItems.map(({ name, onClick }) => (
          <MenuItem onClick={() => menuItemClick(onClick)} key={name}>{name}</MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ControlMenu;
