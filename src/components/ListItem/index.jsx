import React, { useState } from 'react';
import Card from 'components/Card';
import ListControls from 'components/ListControls';
import './index.scss';

const ListItem = ({
  children, header, onEdit, onDelete, className, bold, collapsible, ...other
}) => {
  const [collapsed, setColapsed] = useState(false);
  let cName = `list-item ${className}`;
  if (collapsible) {
    cName = `${cName} collapsible ${collapsed ? 'collapsed' : ''}`;
  }

  return (
    <Card className={cName} {...other}>
      <Card.Header>
        <span
          className={`header-text ${bold ? 'bold' : ''}`}
          onClick={() => setColapsed((!collapsible) ? false : !collapsed)}
          role="button"
        >
          {header}
        </span>
        <ListControls onEdit={onEdit} onDelete={onDelete} />
      </Card.Header>
      {!collapsed && (
        <Card.Body>
          {children}
        </Card.Body>
      )}
    </Card>
  );
};

export default ListItem;
