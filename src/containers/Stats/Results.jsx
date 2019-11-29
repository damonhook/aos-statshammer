import React from 'react';
import ListItem from 'components/ListItem';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useMediaQuery } from '@material-ui/core';
import Graphs from './Graphs';
import ResultsTable from './ResultsTable';


const useStyles = makeStyles({
  results: {},
});

const Results = ({ stats, unitNames, className }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ListItem className={clsx(classes.results, className)} header="Generated Stats" collapsible={!mobile}>
      <ResultsTable stats={stats} unitNames={unitNames} />
      <Graphs stats={stats} unitNames={unitNames} />
    </ListItem>
  );
};

export default Results;
