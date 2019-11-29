import React from 'react';
import ListItem from 'components/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Graphs from './Graphs';
import ResultsTable from './ResultsTable';


const useStyles = makeStyles({
  results: {},
});

const Results = ({ stats, unitNames, className }) => {
  const classes = useStyles();

  return (
    <ListItem className={clsx(classes.results, className)} header="Generated Stats" collapsible>
      <ResultsTable stats={stats} unitNames={unitNames} />
      <Graphs stats={stats} unitNames={unitNames} />
    </ListItem>
  );
};

export default Results;
