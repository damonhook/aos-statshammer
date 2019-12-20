import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar as Bar, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AppMenu from './AppMenu';

const useStyles = makeStyles((theme) => ({
  appBar: {},
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    padding: theme.spacing(2, 0),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
}));


/**
 * The app bar that appears on top of the page
 */
const AppBar = ({ title }) => {
  const classes = useStyles();

  return (
    <Bar position="static" className={classes.appBar}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <Link to="/" className={classes.link}>
          <Typography variant="h5" component="h1" className={classes.title}>
            {title}
          </Typography>
        </Link>
        <AppMenu />
      </Toolbar>
    </Bar>
  );
};

AppBar.propTypes = {
  /** The title to display in the App Bar */
  title: PropTypes.string.isRequired,
};

export default AppBar;
