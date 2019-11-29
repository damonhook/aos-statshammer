import React from 'react';
import {
  IconButton, ButtonGroup, useMediaQuery, Tooltip,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Edit, Delete, FileCopy } from '@material-ui/icons';
import ControlMenu from './ControlMenu';

const ListControl = ({ onClick, icon, tooltip }) => (
  <Tooltip title={tooltip}>
    <IconButton size="small" onClick={onClick}>{icon}</IconButton>
  </Tooltip>
);

const ListControls = ({
  onEdit, onDelete, onCopy, className,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  if (!onEdit && !onCopy && !onDelete) {
    return null;
  }
  if (matches) {
    return <ControlMenu onEdit={onEdit} onDelete={onDelete} onCopy={onCopy} />;
  }
  return (
    <ButtonGroup className={`list-controls ${className}`}>
      {onEdit && <ListControl onClick={onEdit} icon={<Edit />} tooltip="Edit" />}
      {onCopy && <ListControl onClick={onCopy} icon={<FileCopy />} tooltip="Copy" />}
      {onDelete && <ListControl onClick={onDelete} icon={<Delete />} tooltip="Delete" />}
    </ButtonGroup>
  );
};

export default ListControls;
