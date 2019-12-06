import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import Graphs from './Graphs';
import ResultsTable from './ResultsTable';


const useStyles = makeStyles({
  results: {
    flexDirection: 'column',
    flexGrow: 1,
    flexBasis: 0,
    height: '100%',
    maxWidth: '100vw',
  },
});

const Results = ({ stats, unitNames, className }) => {
  const classes = useStyles();

  return (
    <Typography className={clsx(classes.results, className)} component="div">
      <ResultsTable stats={stats} unitNames={unitNames} />
      <Graphs stats={stats} unitNames={unitNames} />
    </Typography>
  );
};

export default Results;
