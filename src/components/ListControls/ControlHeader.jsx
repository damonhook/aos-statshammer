import React from 'react';
import { IconButton, ButtonGroup, Tooltip } from '@material-ui/core';
import { Edit, Delete, FileCopy } from '@material-ui/icons';
import ControlMenu from './ControlMenu';

const HeaderButton = ({ onClick, icon, tooltip }) => (
  <Tooltip title={tooltip}>
    <IconButton size="small" onClick={onClick}>{icon}</IconButton>
  </Tooltip>
);

const ControlHeader = ({
  onEdit, onDelete, onCopy, extraItems, className,
}) => (
  <div>
    <ButtonGroup className={`list-controls ${className}`}>
      {onEdit && <HeaderButton onClick={onEdit} icon={<Edit />} tooltip="Edit" />}
      {onCopy && <HeaderButton onClick={onCopy} icon={<FileCopy />} tooltip="Copy" />}
      {onDelete && <HeaderButton onClick={onDelete} icon={<Delete />} tooltip="Delete" />}
      {extraItems && <ControlMenu extraItems={extraItems} size="small" />}
    </ButtonGroup>
  </div>
);

export default ControlHeader;
