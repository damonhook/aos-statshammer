import { ListItem } from '@material-ui/core';
import Link from 'components/Link';
import React from 'react';

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
