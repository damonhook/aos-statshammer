import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { BarChart } from '@material-ui/icons';
import { toggleDesktopGraphList } from 'actions/config.action';
import { connect } from 'react-redux';

interface ToggleGraphListItemProps {
  toggleDesktopGraphList: any;
}

const ToggleGraphListItem: React.FC<ToggleGraphListItemProps> = ({ toggleDesktopGraphList }) => {
  const handleClick = () => {
    toggleDesktopGraphList();
  };

  return (
    <ListItem button onClick={handleClick}>
      <ListItemIcon>
        <BarChart />
      </ListItemIcon>
      <ListItemText primary="Toggle Graph List/Tabs" />
    </ListItem>
  );
};

export default connect(null, { toggleDesktopGraphList })(ToggleGraphListItem);
