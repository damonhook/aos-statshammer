import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';


const useStyles = makeStyles({
  menu: {},
});

const ControlMenu = ({ onEdit, onDelete, onCopy }) => {
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

  return (
    <div className={classes.menu}>
      <IconButton onClick={handleClick}>
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
        {onCopy && <MenuItem onClick={() => menuItemClick(onCopy)}>Copy</MenuItem>}
        {onDelete && <MenuItem onClick={() => menuItemClick(onDelete)}>Delete</MenuItem>}
      </Menu>
    </div>
  );
};

export default ControlMenu;
