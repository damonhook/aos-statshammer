import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ListControls from 'components/ListControls';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { useMediaQuery, Typography } from '@material-ui/core';
import clsx from 'clsx';
import useLongPress from 'hooks/useLongPress';
import ActionsDialog from 'components/ActionsDialog';
import { LONG_PRESS_DELAY } from 'appConstants';

const useStyles = makeStyles((theme) => ({
  header: {
    justifyContent: 'space-between',
    verticalAlign: 'middle',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  },
  headerText: {
    flex: 1,
    margin: 'auto',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    WebkitTouchCallout: 'none',
    msUserSelect: 'none',
    KhtmlUserSelect: 'none',
  },
  listControls: {
    margin: 'auto',
    marginRight: theme.spacing(-1),
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  collapseIcon: {
    margin: 'auto 0 auto',
    marginLeft: theme.spacing(-1),
  },
  collapsible: {
    cursor: 'pointer',
  },
}));

const ListItemHeader = ({
  header, onEdit, onDelete, onCopy, extraItems, className, collapsible, collapsed, setColapsed,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [dialogOpen, setDialogOpen] = useState(false);
  const longPress = useLongPress(() => setDialogOpen(true), LONG_PRESS_DELAY);

  const handleClick = () => setColapsed((!collapsible) ? false : !collapsed);

  const dialogActions = [];
  if (onDelete) dialogActions.push({ label: 'Delete', onClick: onDelete });
  if (onCopy) {
    dialogActions.push({
      label: 'Copy',
      onClick: onCopy,
      disabled: (!onCopy || onCopy === 'disabled'),
    });
  }

  return (
    <Card.Header
      className={clsx(
        classes.header,
        collapsible ? classes.collapsible : '',
        className, mobile ? classes.mobile : '',
      )}
    >
      {collapsible && (
        <span className={classes.collapseIcon} onClick={handleClick} role="button">
          {collapsed ? <ExpandLess /> : <ExpandMore />}
        </span>
      )}
      <Typography
        className={classes.headerText}
        onClick={handleClick}
        role="button"
        component="span"
        variant="h6"
        {...longPress}
      >
        {header}
      </Typography>
      {dialogActions && (
        <ActionsDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          target={header}
          actions={dialogActions}
        />
      )}
      <ListControls
        onEdit={onEdit}
        onDelete={onDelete}
        onCopy={onCopy}
        extraItems={extraItems}
        className={classes.listControls}
      />
    </Card.Header>
  );
};

ListItemHeader.defaultProps = {
  children: null,
  onEdit: null,
  onDelete: null,
  onCopy: null,
  extraItems: null,
  className: null,
  collapsible: false,
  collapsed: false,
  setColapsed: null,
};

ListItemHeader.propTypes = {
  /** The header test to display for the list item */
  header: PropTypes.string.isRequired,
  /** The react components to render in the card body */
  children: PropTypes.node,
  /** A function to call when edit button is clicked */
  onEdit: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** A function to call when delete button is clicked */
  onDelete: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** A function to call when copy button is clicked */
  onCopy: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** An array of extra commands that will be placed in the control menu */
  extraItems: PropTypes.arrayOf(PropTypes.object),
  /** CSS classname to give the component */
  className: PropTypes.string,
  /** Whether the list item is collapsible or not */
  collapsible: PropTypes.bool,
  /** Whether the list item is collapsed or not */
  collapsed: PropTypes.bool,
  /** A callback function used to change the collapsed state */
  setColapsed: PropTypes.func,
};


export default ListItemHeader;
