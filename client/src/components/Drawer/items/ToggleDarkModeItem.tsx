import { BrightnessMedium as BrightnessMediumIcon } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { configStore } from 'store/slices';

import MenuItem from '../MenuItem';

interface IToggleDarkModeItemProps {
  onClick?: () => void;
  mini?: boolean;
}

const ToggleDarkModeItem = ({ onClick, mini }: IToggleDarkModeItemProps) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(configStore.actions.toggleDarkMode());
    if (onClick) onClick();
  };

  return (
    <MenuItem label="Toggle Dark Mode" icon={<BrightnessMediumIcon />} onClick={handleClick} mini={mini} />
  );
};

export default ToggleDarkModeItem;
