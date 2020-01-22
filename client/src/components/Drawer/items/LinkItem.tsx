import React from 'react';
import Link from 'components/Link';
import { ListItem } from '@material-ui/core';

interface LinkItemProps {
  to: string;
  disabled?: boolean;
}

const LinkItem: React.FC<LinkItemProps> = ({ to, children, disabled }) =>
  disabled ? (
    <ListItem button disabled>
      {children}
    </ListItem>
  ) : (
    <Link to={to} replace>
      <ListItem button>{children}</ListItem>
    </Link>
  );

export default LinkItem;
