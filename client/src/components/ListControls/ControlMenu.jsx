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
  primaryItems, secondaryItems, size, className,
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

  const hasDivider = (
    (primaryItems && primaryItems.length)
    && (secondaryItems && secondaryItems.length)
  );

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
        {primaryItems && primaryItems.map(({ name, onClick, disabled }) => (
          <MenuItem onClick={() => menuItemClick(onClick)} key={name} disabled={disabled}>
            {name}
          </MenuItem>
        ))}
        {hasDivider && <Divider />}
        {secondaryItems && secondaryItems.map(({ name, onClick, disabled }) => (
          <MenuItem onClick={() => menuItemClick(onClick)} key={name} disabled={disabled}>
            {name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

ControlMenu.defaultProps = {
  primaryItems: null,
  secondaryItems: null,
  className: null,
  size: 'medium',
};

ControlMenu.propTypes = {
  /** An array of primary commands that will be placed in the first section of the control menu */
  primaryItems: PropTypes.arrayOf(PropTypes.object),
  /** An array of extra commands that will be placed in the second section of the control menu */
  secondaryItems: PropTypes.arrayOf(PropTypes.object),
  /** CSS classname to give the component */
  className: PropTypes.string,
  /** The size of the menu component */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default ControlMenu;
