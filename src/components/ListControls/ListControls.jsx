import React from 'react';
import { IconButton, ButtonGroup } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

const ListControls = ({ onEdit, onDelete, className }) => (
  <ButtonGroup className={`list-controls ${className}`}>
    {onEdit && <IconButton size="small" onClick={onEdit}><Edit /></IconButton>}
    {onDelete && <IconButton size="small" onClick={onDelete}><Delete /></IconButton>}
  </ButtonGroup>
);

export default ListControls;
