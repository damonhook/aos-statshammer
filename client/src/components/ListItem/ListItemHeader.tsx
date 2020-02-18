import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DragHandle, ExpandLess, ExpandMore } from '@material-ui/icons';
import appConfig from 'appConfig';
import clsx from 'clsx';
import ActionsDialog from 'components/ActionsDialog';
import { CardHeader } from 'components/Card';
import ListControls from 'components/ListControls';
import { IPrimaryItem, ISecondaryItem } from 'components/ListControls/types';
import useLongPress from 'hooks/useLongPress';
import React, { useState } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

const useStyles = makeStyles(theme => ({
  header: {
    justifyContent: 'space-between',
    verticalAlign: 'middle',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  },
  grow: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  headerText: {
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
    verticalAlign: 'middle',
  },
  collapsible: {
    cursor: 'pointer',
  },
}));

interface IListItemHeaderProps {
  header: string;
  primaryItems?: IPrimaryItem[];
  secondaryItems?: ISecondaryItem[];
  className?: string;
  collapsible?: boolean;
  startCollapsed?: boolean;
  collapsed: boolean;
  setColapsed: (collapsed: boolean) => void;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

const ListItemHeader: React.FC<IListItemHeaderProps> = ({
  header,
  primaryItems,
  secondaryItems,
  className,
  collapsible,
  collapsed,
  setColapsed,
  dragHandleProps,
}) => {
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);
  const longPress = useLongPress(() => setDialogOpen(true), appConfig.timers.longPress);

  const handleClick = () => setColapsed(!collapsible ? false : !collapsed);

  let dialogActions: ISecondaryItem[] = [];
  if (primaryItems && primaryItems.length) {
    dialogActions = primaryItems.map(({ name, onClick, disabled }) => ({
      name,
      onClick,
      disabled,
    }));
  }

  return (
    <CardHeader className={clsx(classes.header, collapsible ? classes.collapsible : '', className)}>
      {dragHandleProps && (
        <div {...dragHandleProps} tabIndex={-1}>
          <DragHandle fontSize="large" cursor="move" />
        </div>
      )}
      <div className={classes.grow} onClick={handleClick}>
        <Typography className={classes.headerText} role="button" component="span" variant="h6" {...longPress}>
          {header}
        </Typography>
        {collapsible && (
          <span className={classes.collapseIcon} onClick={handleClick} role="button">
            {collapsed ? <ExpandLess /> : <ExpandMore />}
          </span>
        )}
      </div>
      {dialogActions && (
        <ActionsDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          target={header}
          actions={dialogActions}
        />
      )}
      <ListControls
        primaryItems={primaryItems}
        secondaryItems={secondaryItems}
        className={classes.listControls}
      />
    </CardHeader>
  );
};

ListItemHeader.defaultProps = {
  collapsible: false,
  collapsed: false,
};

export default ListItemHeader;
