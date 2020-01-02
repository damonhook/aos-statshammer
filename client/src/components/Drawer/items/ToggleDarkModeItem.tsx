import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { BrightnessMedium as BrightnessMediumIcon } from '@material-ui/icons';
import { toggleDarkMode } from 'actions/config.action';
import { connect } from 'react-redux';

interface ToggleDarkModeItemProps {
  onClick?: () => void;
  toggleDarkMode: any;
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

export default connect(null, { toggleDarkMode })(ToggleDarkModeItem);
