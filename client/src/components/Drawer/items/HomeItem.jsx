import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';
import LinkItem from './LinkItem';

const HomeItem = () => (
  <LinkItem to="/">
    <ListItemIcon><HomeIcon /></ListItemIcon>
    <ListItemText primary="Home" />
  </LinkItem>
);

export default HomeItem;
