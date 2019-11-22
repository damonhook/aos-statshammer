import React from 'react';
import { Button } from 'semantic-ui-react';
import './index.scss';

const ListControls = ({ onEdit, onDelete }) => (
  <Button.Group className="list-controls" size="mini">
    {onEdit && <Button onClick={onEdit} icon="edit" />}
    {onDelete && <Button onClick={onDelete} icon="trash" />}
  </Button.Group>
);

export default ListControls;
