import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  panel: {},
  content: { marginTop: '2px' },
});

/**
 * A single Tab Content wrapper
 */
const TabPanel = ({
  children, value, index, className, ...other
}) => {
  const classes = useStyles();
  return (
    <Typography
      component="div"
      className={clsx(classes.panel, className)}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Typography component="div" className={classes.content}>{children}</Typography>
    </Typography>
  );
};

TabPanel.defaultProps = {
  className: null,
};

TabPanel.propTypes = {
  /** The content to display in the tab */
  children: PropTypes.node.isRequired,
  /** The current active tab index */
  value: PropTypes.number.isRequired,
  /** The index in the tab list this content belongs to */
  index: PropTypes.number.isRequired,
  /** Any additional class names to apply to the component */
  className: PropTypes.string,
};

export default TabPanel;
