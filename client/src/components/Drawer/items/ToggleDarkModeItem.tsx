import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { BrightnessMedium as BrightnessMediumIcon } from '@material-ui/icons';
import { config } from 'store/slices';
import { connect, ConnectedProps } from 'react-redux';

const connector = connect(null, {
  toggleDarkMode: config.actions.toggleDarkMode,
});
interface ToggleDarkModeItemProps extends ConnectedProps<typeof connector> {
  onClick?: () => void;
}

const ToggleDarkModeItem: React.FC<ToggleDarkModeItemProps> = ({ onClick, toggleDarkMode }) => {
  const handleClick = () => {
    toggleDarkMode();
    if (onClick) onClick();
  };

  return (
    <ListItem button onClick={handleClick}>
      <ListItemIcon>
        <BrightnessMediumIcon />
      </ListItemIcon>
      <ListItemText primary="Toggle Dark Mode" />
    </ListItem>
  );
};

export default connector(ToggleDarkModeItem);
