import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import { ErrorOutline, Sync } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  errorCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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

interface ErrorCardProps {
  retryFunc: any;
  className?: string;
}

/**
 * A card representing that there was an error getting the stats
 */
const ErrorCard: React.FC<ErrorCardProps> = ({ retryFunc, className }) => {
  const classes = useStyles();

  const handleClick = () => {
    retryFunc();
  };

  return (
    <Paper className={clsx(classes.errorCard, className)} onClick={handleClick} role="button">
      <Typography variant="h4" component="div" className={classes.errorHeader}>
        <ErrorOutline className={classes.errorIcon} fontSize="inherit" />
        <Typography variant="h4" component="span">
          Error Fetching Stats
        </Typography>
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

export default ErrorCard;
