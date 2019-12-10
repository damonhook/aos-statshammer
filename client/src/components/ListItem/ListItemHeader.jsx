import React, { useState } from 'react';
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

export default ListItemHeader;
