import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  panel: {},
  content: { marginTop: '2px' },
});

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
      <Paper square className={classes.content}>{children}</Paper>
    </Typography>
  );
};

export default TabPanel;
