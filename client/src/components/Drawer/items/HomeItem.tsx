import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';
import { ROUTES } from 'utils/urls';
import LinkItem from './LinkItem';

const HomeItem = () => (
  <LinkItem to={ROUTES.HOME}>
    <ListItemIcon>
      <HomeIcon />
    </ListItemIcon>
    <ListItemText primary="Home" />
  </LinkItem>
);

export default HomeItem;
