import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { BarChart } from '@material-ui/icons';
import { connect, ConnectedProps } from 'react-redux';
import { config } from 'store/slices';

const connector = connect(null, {
  toggleDesktopGraphList: config.actions.toggleDesktopGraphList,
});
interface ToggleGraphListItemProps extends ConnectedProps<typeof connector> {}

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

export default connector(ToggleGraphListItem);
