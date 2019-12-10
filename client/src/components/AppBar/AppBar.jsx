import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar as Bar, Toolbar, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  appBar: {},
  title: {
    padding: theme.spacing(2, 0),
  },
}));

const AppBar = ({ title }) => {
  const classes = useStyles();

  return (
    <Bar position="static" className={classes.appBar}>
      <Toolbar variant="dense">
        <Typography variant="h5" component="h1" className={classes.title}>
          {title}
        </Typography>
      </Toolbar>
    </Bar>
  );
};

AppBar.propTypes = {
  /** The title to display in the App Bar */
  title: PropTypes.string.isRequired,
};

export default AppBar;
