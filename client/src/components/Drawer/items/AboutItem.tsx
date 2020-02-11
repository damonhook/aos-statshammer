import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { Info as InfoIcon } from '@material-ui/icons';
import { ROUTES } from 'utils/urls';
import LinkItem from './LinkItem';

const AboutItem = () => (
  <LinkItem to={ROUTES.ABOUT}>
    <ListItemIcon>
      <InfoIcon />
    </ListItemIcon>
    <ListItemText primary="About" />
  </LinkItem>
);

export default AboutItem;
