import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

/**
 * A list item component that renders as a card with a header. This component can optionally
 * contain various list related controls, as well as, optionally be collapsible.
 */
const ListItem = ({
  children, header, onEdit, onDelete, onCopy, extraItems, className, collapsible,
  loading, loaderDelay, ...other
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

ListItem.defaultProps = {
  onEdit: null,
  onDelete: null,
  onCopy: null,
  extraItems: null,
  className: null,
  collapible: false,
  loading: false,
  loaderDelay: 500,
};

ListItem.propTypes = {
  /** The react components to render in the card body */
  children: PropTypes.node.isRequired,
  /** A function to call when edit button is clicked */
  onEdit: PropTypes.oneOfType(PropTypes.func, PropTypes.string),
  /** A function to call when delete button is clicked */
  onDelete: PropTypes.oneOfType(PropTypes.func, PropTypes.string),
  /** A function to call when copy button is clicked */
  onCopy: PropTypes.oneOfType(PropTypes.func, PropTypes.string),
  /** An array of extra commands that will be placed in the control menu */
  extraItems: PropTypes.arrayOf(PropTypes.object),
  /** CSS classname to give the component */
  className: PropTypes.string,
  /** Whether the list item is collapsible or not */
  collapible: PropTypes.bool,
  /** Whether the list item should indicate that its content is loading */
  loading: PropTypes.bool,
  /** Optionally change how long the loader will wait before rendering */
  loaderDelay: PropTypes.number,
};

export default ListItem;
