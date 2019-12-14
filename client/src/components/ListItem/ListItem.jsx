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
  children, header, primaryItems, secondaryItems, className, collapsible,
  loading, loaderDelay, ...other
}) => {
  const classes = useStyles();
  const [collapsed, setColapsed] = useState(false);

  return (
    <Card className={clsx(classes.listItem, className)} {...other}>
      <ListItemHeader
        header={header}
        primaryItems={primaryItems}
        secondaryItems={secondaryItems}
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
  primaryItems: null,
  secondaryItems: null,
  className: null,
  collapsible: false,
  loading: false,
  loaderDelay: 500,
};

ListItem.propTypes = {
  /** The header test to display for the list item */
  header: PropTypes.string.isRequired,
  /** The react components to render in the card body */
  children: PropTypes.node.isRequired,
  /** An array of (primary) commands that will be placed in the header for desktop, and in
   * the first portion of the menu for mobile
   * */
  primaryItems: PropTypes.arrayOf(PropTypes.object),
  /** An array of extra commands that will be placed in the control menu */
  secondaryItems: PropTypes.arrayOf(PropTypes.object),
  /** CSS classname to give the component */
  className: PropTypes.string,
  /** Whether the list item is collapsible or not */
  collapsible: PropTypes.bool,
  /** Whether the list item should indicate that its content is loading */
  loading: PropTypes.bool,
  /** Optionally change how long the loader will wait before rendering */
  loaderDelay: PropTypes.number,
};

export default ListItem;
