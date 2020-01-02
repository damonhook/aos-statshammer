import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar as Bar, Toolbar, Typography, IconButton, useScrollTrigger, Slide,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import Drawer from 'components/Drawer';
import Link from 'components/Link';
import { useHashMatch } from 'hooks';

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(7.5),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  leftContent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  menuButton: {
    margin: theme.spacing(0, 1),
    color: theme.palette.getContrastText(theme.palette.primary.main),
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
const AppBar = ({ title, variant }) => {
  const classes = useStyles();
  const history = useHistory();
  const drawerOpen = useHashMatch('#menu');
  const trigger = useScrollTrigger();

  const handleDrawerClose = () => {
    history.goBack();
  };

  const handleDrawerOpen = () => {
    history.push('#menu');
  };

  return (
    <div className={classes.appBar}>
      <Slide appear={false} direction="down" in={!trigger}>
        <Bar>
          <Toolbar variant="dense" className={classes.toolbar} disableGutters>
            <div className={classes.leftContent}>
              <IconButton onClick={handleDrawerOpen} className={classes.menuButton}>
                <MenuIcon />
              </IconButton>
              <Link to="/" className={classes.link}>
                <Typography variant="h5" component="h1" className={classes.title}>
                  {title}
                </Typography>
              </Link>
            </div>
          </Toolbar>
        </Bar>
      </Slide>
      <Drawer open={drawerOpen} onClose={handleDrawerClose} page={variant} />
    </div>
  );
};

AppBar.defaultProps = {
  variant: 'home',
};

AppBar.propTypes = {
  /** The title to display in the App Bar */
  title: PropTypes.string.isRequired,
  /** The variant of App Bar (what type of page we are on) */
  variant: PropTypes.oneOf(['home', 'advanced']),
};

export default AppBar;
