import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  menuItemIcon: {
    marginRight: theme.spacing(1),
  },
  item: {
    color: theme.palette.getContrastText(theme.palette.background.paper),
  },
  link: {
    color: theme.palette.getContrastText(theme.palette.background.paper),
    textDecoration: 'none',
  },
}));

const PdfDownloadItem = ({ onClick }) => {
  const classes = useStyles();

  const handleClick = () => {
    onClick();
  };

  return (
    <Link onClick={handleClick} to="/pdf" className={classes.link}>
      <MenuItem className={classes.item}>
        <GetApp className={classes.menuItemIcon} />
        Download PDF
      </MenuItem>
    </Link>
  );
};

PdfDownloadItem.propTypes = {
  /** A callback function to call when the menu item is clicked */
  onClick: PropTypes.func.isRequired,
};

export default PdfDownloadItem;
