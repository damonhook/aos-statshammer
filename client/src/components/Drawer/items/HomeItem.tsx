import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';
import { getRoute, EPages } from 'types/routes';
import LinkItem from './LinkItem';

const HomeItem = () => (
  <LinkItem to={getRoute(EPages.HOME)}>
    <ListItemIcon>
      <HomeIcon />
    </ListItemIcon>
    <ListItemText primary="Home" />
  </LinkItem>
);

export default HomeItem;
