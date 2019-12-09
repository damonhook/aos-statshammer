import React, { useState } from 'react';
import Card from 'components/Card';
import { Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoadingBar from 'components/LoadingBar';
import clsx from 'clsx';

import ListItemHeader from './ListItemHeader';


const useStyles = makeStyles(() => ({
  listItem: {
    marginBottom: '1em',
  },
  loader: {
    position: 'relative',
  },
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
}));

const ListItem = ({
  children, header, onEdit, onDelete, onCopy, extraItems, className, collapsible,
  loading, loaderDelay = 500, ...other
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
      {loading && <LoadingBar wait={loaderDelay} />}
      <Collapse in={!collapsed}>
        <Card.Body>
          {children}
        </Card.Body>
      </Collapse>
    </Card>
  );
};

export default ListItem;
