import { ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Link from 'components/Link';
import React from 'react';

const useStyles = makeStyles(() => ({
  miniIcon: {
    justifyContent: 'center',
  },
}));

interface IMenuLinkItemProps {
  to: string;
  disabled?: boolean;
  icon: React.ReactElement;
  label: string;
  mini?: boolean;
}
const MenuLinkItem = ({ to, disabled, icon, label, mini }: IMenuLinkItemProps) => {
  const classes = useStyles();

  const inner = (
    <Tooltip title={mini ? label : ''} placement="right" arrow>
      <ListItem button disabled={disabled}>
        <ListItemIcon className={clsx({ [classes.miniIcon]: mini })}>{icon}</ListItemIcon>
        {!mini && <ListItemText primary={label} />}
      </ListItem>
    </Tooltip>
  );

  return !disabled ? (
    <Link to={to} replace>
      {inner}
    </Link>
  ) : (
    inner
  );
};

export default MenuLinkItem;
