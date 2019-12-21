import React from 'react';
import {
  ListItemIcon, ListItemText, ListItem, Link,
} from '@material-ui/core';
import { GitHub, Reddit } from '@material-ui/icons';

const SocialItems = () => (
  <>
    <Link
      rel="noreferrer"
      target="_blank"
      href="https://github.com/damonhook/aos-statshammer"
      color="inherit"
      style={{ textDecoration: 'none' }}
    >
      <ListItem button>
        <ListItemIcon><GitHub /></ListItemIcon>
        <ListItemText primary="Github" />
      </ListItem>
    </Link>
    <Link
      rel="noreferrer"
      target="_blank"
      href="https://www.reddit.com/r/AoSStatshammer"
      color="inherit"
      style={{ textDecoration: 'none' }}
    >
      <ListItem button>
        <ListItemIcon><Reddit /></ListItemIcon>
        <ListItemText primary="Reddit" />
      </ListItem>
    </Link>
  </>
);

export default SocialItems;
