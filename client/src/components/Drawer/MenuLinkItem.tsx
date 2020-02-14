import { ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Link from 'components/Link';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { HASHES } from 'utils/urls';

const useStyles = makeStyles((theme: Theme) => ({
  miniIcon: {
    justifyContent: 'center',
  },
  selected: {
    color: `${theme.palette.primary.main} !important`,
  },
}));

interface IMenuLinkItemProps {
  to: string;
  disabled?: boolean;
  icon: React.ReactElement;
  label: string;
  mini?: boolean;
  selected?: boolean;
}
const MenuLinkItem = ({ to, disabled, icon, label, mini, selected }: IMenuLinkItemProps) => {
  const classes = useStyles();
  const history = useHistory();

  const replace = history.location.hash === HASHES.DRAWER;

  const inner = (
    <Tooltip title={mini ? label : ''} placement="right" arrow>
      <ListItem button disabled={disabled}>
        <ListItemIcon
          className={clsx({ [classes.miniIcon]: mini, [classes.selected]: selected })}
          style={{ color: 'inherit' }}
        >
          {icon}
        </ListItemIcon>
        {!mini && <ListItemText primary={label} className={clsx({ [classes.selected]: selected })} />}
      </ListItem>
    </Tooltip>
  );

  return !disabled ? (
    <Link to={to} replace={replace}>
      {inner}
    </Link>
  ) : (
    inner
  );
};

export default MenuLinkItem;
