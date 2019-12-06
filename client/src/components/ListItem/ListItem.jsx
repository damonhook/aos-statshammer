import React, { useState } from 'react';
import Card from 'components/Card';
import { Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ListItemHeader from './ListItemHeader';


const useStyles = makeStyles(() => ({
  listItem: {
    marginBottom: '1em',
  },
}));

const ListItem = ({
  children, header, onEdit, onDelete, onCopy, extraItems, className, collapsible, ...other
}) => {
  const classes = useStyles();
  const [collapsed, setColapsed] = useState(false);

  return (
    <Card className={clsx(classes.listItem, className)} {...other}>
      <ListItemHeader
        header={header}
        onEdit={onEdit}
        onDelete={onDelete}
        onCopy={onCopy}
        extraItems={extraItems}
        collapsible={collapsible}
        collapsed={collapsed}
        setColapsed={setColapsed}
      />
      <Collapse in={!collapsed}>
        <Card.Body>
          {children}
        </Card.Body>
      </Collapse>
    </Card>
  );
};

export default ListItem;
