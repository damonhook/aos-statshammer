import React from 'react';
import Card from 'components/Card';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ListControls from 'components/ListControls';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
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
  mobile: {
    minHeight: theme.spacing(5.5),
  },
}));

const ListItemHeader = ({
  header, onEdit, onDelete, onCopy, extraItems, className, collapsible, collapsed, setColapsed,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = () => setColapsed((!collapsible) ? false : !collapsed);

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
  );
};

export default ListItemHeader;
