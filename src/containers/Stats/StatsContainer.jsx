import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Results from './Results';

const useStyles = makeStyles({
  statsContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    flexBasis: 0,
  },
  button: {
    marginBottom: '1em',
  },
  results: {},
});

const StatsContainer = ({ unitNames, stats }) => {
  const classes = useStyles();

  return (
    <div className={classes.statsContainer}>
      <Results stats={stats} unitNames={unitNames} className={classes.results} />
    </div>
  );
};

export default StatsContainer;
