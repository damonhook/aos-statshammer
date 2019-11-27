import React from 'react';
import { IconButton, ButtonGroup, useMediaQuery } from '@material-ui/core';
import { Edit, Delete, FileCopy } from '@material-ui/icons';
import ControlMenu from './ControlMenu';

const ListControls = ({
  onEdit, onDelete, onCopy, className,
}) => {
  const matches = useMediaQuery('(max-width:712px)');
  if (!onEdit && !onCopy && !onDelete) {
    return null;
  }
  if (matches) {
    return <ControlMenu onEdit={onEdit} onDelete={onDelete} onCopy={onCopy} />;
  }
  return (
    <ButtonGroup className={`list-controls ${className}`}>
      {onEdit && <IconButton size="small" onClick={onEdit}><Edit /></IconButton>}
      {onCopy && <IconButton size="small" onClick={onCopy}><FileCopy /></IconButton>}
      {onDelete && <IconButton size="small" onClick={onDelete}><Delete /></IconButton>}
    </ButtonGroup>
  );
};

export default ListControls;
