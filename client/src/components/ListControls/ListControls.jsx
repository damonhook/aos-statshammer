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

ListControls.defaultProps = {
  onEdit: null,
  onDelete: null,
  onCopy: null,
  extraItems: null,
  className: null,
};


ListControls.propTypes = {
  /** A function to call when edit button is clicked */
  onEdit: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** A function to call when delete button is clicked */
  onDelete: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** A function to call when copy button is clicked */
  onCopy: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** An array of extra commands that will be placed in a control menu */
  extraItems: PropTypes.arrayOf(PropTypes.object),
  /** CSS classname to give the component */
  className: PropTypes.string,
};

export default ListControls;
