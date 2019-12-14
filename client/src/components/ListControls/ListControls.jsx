import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ControlMenu from './ControlMenu';
import ControlHeader from './ControlHeader';


/**
 * A list of buttons to display for the list item
 * */
const ListControls = ({
  primaryItems, secondaryItems, className,
}) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!primaryItems && !secondaryItems) return null;
  return mobile
    ? (
      <ControlMenu
        primaryItems={primaryItems}
        secondaryItems={secondaryItems}
        className={className}
      />
    )
    : (
      <ControlHeader
        className={className}
        primaryItems={primaryItems}
        secondaryItems={secondaryItems}
      />
    );
};

ListControls.defaultProps = {
  primaryItems: null,
  secondaryItems: null,
  className: null,
};


ListControls.propTypes = {
  /** An array of (primary) commands that will be placed in the header for desktop, and in
   * the first portion of the menu for mobile
   * */
  primaryItems: PropTypes.arrayOf(PropTypes.object),
  /** An array of extra (secondary) commands that will be placed in a control menu */
  secondaryItems: PropTypes.arrayOf(PropTypes.object),
  /** CSS classname to give the component */
  className: PropTypes.string,
};

export default ListControls;
