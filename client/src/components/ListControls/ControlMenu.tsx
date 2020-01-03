import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, IconButton, Divider } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import clsx from 'clsx';
import { IPrimaryItem, ISecondaryItem } from './types';

const useStyles = makeStyles({
  menu: {},
});

interface IControlMenuProps {
  primaryItems?: IPrimaryItem[];
  secondaryItems?: ISecondaryItem[];
  className?: string;
  size?: 'small' | 'medium';
}

/**
 * A menu component with the various options
 */
const ControlMenu: React.FC<IControlMenuProps> = ({
  primaryItems,
  secondaryItems,
  size,
  className,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItemClick = action => {
    if (typeof action !== 'string') {
      action();
    }
    handleClose();
  };

  const hasDivider = primaryItems && primaryItems.length && secondaryItems && secondaryItems.length;

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
        {primaryItems &&
          primaryItems.map(({ name, onClick, disabled }) => (
            <MenuItem onClick={() => menuItemClick(onClick)} key={name} disabled={disabled}>
              {name}
            </MenuItem>
          ))}
        {hasDivider && <Divider />}
        {secondaryItems &&
          secondaryItems.map(({ name, onClick, disabled }) => (
            <MenuItem onClick={() => menuItemClick(onClick)} key={name} disabled={disabled}>
              {name}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

ControlMenu.defaultProps = {
  size: 'medium',
};

export default ControlMenu;
