import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Typography, Button } from '@material-ui/core';
import ListItem from 'components/ListItem';
import _ from 'lodash';
import Graphs from 'containers/Graphs';
import { useHistory } from 'react-router-dom';
import { GetApp } from '@material-ui/icons';
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

const Results = React.memo(({ stats, unitNames, className }) => {
  const classes = useStyles();
  const firstLoad = (!stats.payload || !stats.payload.length) && stats.pending;
  const history = useHistory();

  const onPdfClick = () => {
    history.push('/pdf');
  };

  return (
    <Typography className={clsx(classes.results, className)} component="div">
      <ListItem
        header="Average Damage Table"
        collapsible
        loading={stats.pending}
        loaderDelay={firstLoad ? 0 : 350}
      >
        <ResultsTable stats={stats} unitNames={unitNames} />
      </ListItem>
      <Graphs stats={stats} unitNames={unitNames} />
      <Button
        variant="contained"
        color="primary"
        onClick={onPdfClick}
        fullWidth
        startIcon={<GetApp />}
      >
        Download PDF
      </Button>
    </Typography>
  );
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

export default Results;
