import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { Info as InfoIcon } from '@material-ui/icons';
import { getRoute, EPages } from 'types/routes';
import LinkItem from './LinkItem';

const AboutItem = () => (
  <LinkItem to={getRoute(EPages.ABOUT)}>
    <ListItemIcon>
      <InfoIcon />
    </ListItemIcon>
    <ListItemText primary="About" />
  </LinkItem>
);

export default AboutItem;
