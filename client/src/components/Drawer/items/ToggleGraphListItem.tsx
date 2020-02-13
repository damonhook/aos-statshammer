import { BarChart } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { config as configStore } from 'store/slices';

import MenuItem from '../MenuItem';

interface IToggleGraphListItemProps {
  onClick?: () => void;
  mini?: boolean;
}

const ToggleGraphListItem = ({ onClick, mini }: IToggleGraphListItemProps) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(configStore.actions.toggleDesktopGraphList());
    if (onClick) onClick();
  };

  return <MenuItem label="Toggle Graph List/Tabs" icon={<BarChart />} onClick={handleClick} mini={mini} />;
};

export default ToggleGraphListItem;
