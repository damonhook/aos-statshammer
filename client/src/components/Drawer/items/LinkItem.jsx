import React from 'react';
import Link from 'components/Link';
import { ListItem } from '@material-ui/core';

const LinkItem = ({ to, children, disabled }) => (
  disabled ? (
    <ListItem button disabled>{children}</ListItem>
  ) : (
    <Link to={to} replace>
      <ListItem button>
        {children}
      </ListItem>
    </Link>
  )
);

export default LinkItem;
