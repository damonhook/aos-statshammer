import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, ButtonGroup, Tooltip } from '@material-ui/core';
import { Edit, Delete, FileCopy } from '@material-ui/icons';
import ControlMenu from './ControlMenu';

const HeaderButton = ({
  onClick, icon, tooltip, disabled,
}) => (
  <Tooltip title={tooltip}>
    <IconButton size="small" onClick={onClick} disabled={disabled}>{icon}</IconButton>
  </Tooltip>
);

HeaderButton.defaultProps = {
  disabled: false,
};

HeaderButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  tooltip: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

const ControlHeader = ({
  onEdit, onDelete, onCopy, extraItems, className,
}) => (
  <div>
    <ButtonGroup className={`list-controls ${className}`}>
      {onEdit && <HeaderButton onClick={onEdit} icon={<Edit />} tooltip="Edit" />}
      {onCopy && <HeaderButton onClick={onCopy} icon={<FileCopy />} disabled={onCopy === 'disabled'} tooltip="Copy" />}
      {onDelete && <HeaderButton onClick={onDelete} icon={<Delete />} tooltip="Delete" />}
      {extraItems && <ControlMenu extraItems={extraItems} size="small" />}
    </ButtonGroup>
  </div>
);

ControlHeader.defaultProps = {
  onEdit: null,
  onDelete: null,
  onCopy: null,
  extraItems: null,
  className: null,
};

ControlHeader.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onCopy: PropTypes.func,
  extraItems: PropTypes.arrayOf(PropTypes.object),
  /** CSS classname to give the component */
  className: PropTypes.string,
};

export default ControlHeader;
