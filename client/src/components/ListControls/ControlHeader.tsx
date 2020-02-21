import { ButtonGroup, IconButton, Tooltip } from '@material-ui/core';
import React from 'react';

import ControlMenu from './ControlMenu';
import { IPrimaryItem, ISecondaryItem } from './types';

interface IHeaderButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  tooltip?: string;
  disabled?: boolean;
}

const HeaderButton: React.FC<IHeaderButtonProps> = ({ onClick, icon, tooltip, disabled }) => (
  <Tooltip title={tooltip}>
    <span>
      <IconButton size="small" onClick={onClick} disabled={disabled}>
        {icon}
      </IconButton>
    </span>
  </Tooltip>
);

HeaderButton.defaultProps = {
  disabled: false,
};

interface IControlHeaderProps {
  primaryItems?: IPrimaryItem[];
  secondaryItems?: ISecondaryItem[];
  className?: string;
}

const ControlHeader: React.FC<IControlHeaderProps> = ({ primaryItems, secondaryItems, className }) => (
  <div>
    <ButtonGroup className={`list-controls ${className}`}>
      {primaryItems &&
        primaryItems.map(({ name, onClick, disabled, icon }) => (
          <HeaderButton key={name} onClick={onClick} icon={icon} tooltip={name} disabled={disabled} />
        ))}
      {secondaryItems && <ControlMenu secondaryItems={secondaryItems} size="small" />}
    </ButtonGroup>
  </div>
);

export default ControlHeader;
