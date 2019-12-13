import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import { fetchStatsCompare } from 'api';
import { bindActionCreators } from 'redux';
import { red } from '@material-ui/core/colors';
import { ErrorOutline, Sync } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  errorCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: red[100],
    backgroundColor: theme.palette.background.error,
    color: theme.palette.getContrastText(theme.palette.background.error),
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
    textAlign: 'center',
    cursor: 'pointer',
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      // backgroundColor: red[200],
      backgroundColor: lighten(theme.palette.background.error, 0.3),
    },
    '&:focus, &:active': {
      backgroundColor: red[300],
    },
  },
  errorHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorIcon: {
    paddingRight: theme.spacing(1),
  },
  retryIcon: {
    margin: theme.spacing(1, 0),
  },
}));

/**
 * A card representing that there was an error getting the stats
 */
const StatsErrorCard = ({ fetchStatsCompare, className }) => {
  const classes = useStyles();

  const handleClick = () => {
    fetchStatsCompare();
  };

  return (
    <Paper className={clsx(classes.errorCard, className)} onClick={handleClick} role="button">
      <Typography variant="h4" component="div" className={classes.errorHeader}>
        <ErrorOutline className={classes.errorIcon} fontSize="inherit" />
        <Typography variant="h4" component="span">Error Fetching Stats</Typography>
      </Typography>
      <Typography>There was an error fetching stats from the server</Typography>
      <Typography variant="h1" component="div" className={classes.retryIcon}>
        <Sync fontSize="inherit" />
      </Typography>
      <Typography>Tap here to retry.</Typography>
      <Typography>If the issue persists, ensure that the unit data is valid</Typography>
    </Paper>
  );
};

StatsErrorCard.defaultProps = {
  className: null,
};

StatsErrorCard.propTypes = {
  /** A function used to fetch the stats */
  fetchStatsCompare: PropTypes.func.isRequired,
  /** CSS classname to give the component */
  className: PropTypes.string,
};


const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchStatsCompare,
}, dispatch);

export default connect(null, mapDispatchToProps)(StatsErrorCard);
