import React from 'react';
import Card from 'components/Card';
import ListControls from 'components/ListControls';
import './index.scss';

const ListItem = ({
  children, header, onEdit, onDelete, className, bold, ...other
}) => (
  <Card className={`list-item ${className}`} {...other}>
    <Card.Header>
      <span className={`header-text ${bold ? 'bold' : ''}`}>{header}</span>
      <ListControls onEdit={onEdit} onDelete={onDelete} />
    </Card.Header>
    <Card.Body>
      {children}
    </Card.Body>
  </Card>
);

export default ListItem;
