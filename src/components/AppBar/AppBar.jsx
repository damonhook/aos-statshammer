import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar as Bar, Toolbar, Typography } from '@material-ui/core';


const useStyles = makeStyles(() => ({
  appBar: {},
}));

const AppBar = ({ title }) => {
  const classes = useStyles();

  return (
    <Bar position="static" className={classes.appBar}>
      <Toolbar variant="dense">
        <Typography variant="h6">
          {title}
        </Typography>
      </Toolbar>
    </Bar>
  );
};


export default AppBar;
