import React, { useState } from 'react';
import Card from 'components/Card';
import { Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListControls from 'components/ListControls';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles({
  listItem: {
    marginBottom: '1em',
  },
  header: {
    justifyContent: 'space-between',
    verticalAlign: 'middle',
  },
  headerText: {
    flex: 1,
    margin: 'auto',
  },
  listControls: {
    marginLeft: 'auto',
    marginRight: '-1em',
  },
  collapseIcon: {
    margin: 'auto 0 auto -1em',
  },
  collapsible: {
    cursor: 'pointer',
  },
});

const ListItem = ({
  children, header, onEdit, onDelete, onCopy, extraItems, className, collapsible, ...other
}) => {
  const classes = useStyles();
  const [collapsed, setColapsed] = useState(false);
  const cName = `${className} ${classes.listItem}`;

  const handleClick = () => setColapsed((!collapsible) ? false : !collapsed);

  return (
    <Card className={cName} {...other}>
      <Card.Header className={`${classes.header} ${collapsible ? classes.collapsible : ''}`}>
        {collapsible && (
          <span className={classes.collapseIcon} onClick={handleClick} role="button">
            {collapsed ? <ExpandLess /> : <ExpandMore />}
          </span>
        )}
        <span className={`${classes.headerText}`} onClick={handleClick} role="button">
          {header}
        </span>
        <ListControls
          onEdit={onEdit}
          onDelete={onDelete}
          onCopy={onCopy}
          extraItems={extraItems}
          className={classes.listControls}
        />
      </Card.Header>
      <Collapse in={!collapsed}>
        <Card.Body>
          {children}
        </Card.Body>
      </Collapse>
    </Card>
  );
};

export default ListItem;
