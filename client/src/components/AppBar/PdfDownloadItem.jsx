import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import BetaTag from 'components/BetaTag';

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

const PdfDownloadItem = ({ onClick, numUnits }) => {
  const classes = useStyles();

  const handleClick = () => {
    onClick();
  };

  const disabled = numUnits <= 0;

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link onClick={handleClick} to={disabled ? '' : '/pdf'} className={classes.link}>
      <MenuItem className={classes.item} disabled={disabled}>
        <GetApp className={classes.menuItemIcon} />
        Download PDF
        <BetaTag />
      </MenuItem>
    </Link>
  );
};

PdfDownloadItem.propTypes = {
  /** A callback function to call when the menu item is clicked */
  onClick: PropTypes.func.isRequired,
  /** The current number of units. Used to disable the button */
  numUnits: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  numUnits: state.units.length,
});

export default connect(mapStateToProps)(PdfDownloadItem);
