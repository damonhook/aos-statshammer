import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, ButtonGroup, Tooltip } from '@material-ui/core';
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
  onClick: null,
};

HeaderButton.propTypes = {
  onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  icon: PropTypes.node.isRequired,
  tooltip: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

const ControlHeader = ({ primaryItems, secondaryItems, className }) => (
  <div>
    <ButtonGroup className={`list-controls ${className}`}>
      {primaryItems && primaryItems.map(({
        name, onClick, disabled, icon,
      }) => (
        <HeaderButton
          onClick={onClick}
          icon={icon}
          tooltip={name}
        />
      ))}
      {secondaryItems && <ControlMenu secondaryItems={secondaryItems} size="small" />}
    </ButtonGroup>
  </div>
);

ControlHeader.defaultProps = {
  primaryItems: null,
  secondaryItems: null,
  className: null,
};

ControlHeader.propTypes = {
  /** An array of commands that will be placed in the header */
  primaryItems: PropTypes.arrayOf(PropTypes.object),
  /** An array of extra commands that will be placed in a control menu */
  secondaryItems: PropTypes.arrayOf(PropTypes.object),
  /** CSS classname to give the component */
  className: PropTypes.string,
};

export default ControlHeader;
