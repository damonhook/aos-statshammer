import { ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(() => ({
  miniIcon: {
    justifyContent: 'center',
  },
}));

interface IMenuLinkItemProps {
  onClick?: () => void;
  disabled?: boolean;
  icon: React.ReactElement;
  label: string;
  mini?: boolean;
}
const MenuLinkItem = ({ onClick, disabled, icon, label, mini }: IMenuLinkItemProps) => {
  const classes = useStyles();

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <Tooltip title={mini ? label : ''} placement="right" arrow>
      <ListItem button disabled={disabled} onClick={handleClick}>
        <ListItemIcon className={clsx({ [classes.miniIcon]: mini })}>{icon}</ListItemIcon>
        {!mini && <ListItemText primary={label} />}
      </ListItem>
    </Tooltip>
  );
};

export default MenuLinkItem;
