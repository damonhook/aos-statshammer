import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ControlMenu from './ControlMenu';
import ControlHeader from './ControlHeader';
import { IPrimaryItem, ISecondaryItem } from './types';

interface IListControlsProps {
  primaryItems?: IPrimaryItem[];
  secondaryItems?: ISecondaryItem[];
  className?: string;
}

/**
 * A list of buttons to display for the list item
 * */
const ListControls: React.FC<IListControlsProps> = ({
  primaryItems,
  secondaryItems,
  className,
}) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!primaryItems && !secondaryItems) return null;
  return mobile ? (
    <ControlMenu
      primaryItems={primaryItems}
      secondaryItems={secondaryItems}
      className={className}
    />
  ) : (
    <ControlHeader
      className={className}
      primaryItems={primaryItems}
      secondaryItems={secondaryItems}
    />
  );
};

export default ListControls;
