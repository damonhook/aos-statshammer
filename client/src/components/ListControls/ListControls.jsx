import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ControlMenu from './ControlMenu';
import ControlHeader from './ControlHeader';

const ListControls = ({
  onEdit, onDelete, onCopy, extraItems, className,
}) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!onEdit && !onCopy && !onDelete && !extraItems) return null;
  return mobile
    ? (
      <ControlMenu
        onEdit={onEdit}
        onDelete={onDelete}
        onCopy={onCopy}
        extraItems={extraItems}
        className={className}
      />
    )
    : (
      <ControlHeader
        className={className}
        onEdit={onEdit}
        onDelete={onDelete}
        onCopy={onCopy}
        extraItems={extraItems}
      />
    );
};

export default ListControls;
