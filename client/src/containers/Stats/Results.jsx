import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Typography, Button, useMediaQuery } from '@material-ui/core';
import ListItem from 'components/ListItem';
import _ from 'lodash';
import Graphs from 'containers/Graphs';
import { Link } from 'react-router-dom';
import { GetApp } from '@material-ui/icons';
import BetaTag from 'components/BetaTag';
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
  const theme = useTheme();
  const firstLoad = (!stats.payload || !stats.payload.length) && stats.pending;
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const downloadDisabled = unitNames.length <= 0;

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
      {!mobile
        && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link to={downloadDisabled ? '' : '/pdf'} style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<GetApp />}
              disabled={downloadDisabled}
            >
              Download PDF
              <BetaTag variant={theme.palette.type} />
            </Button>
          </Link>
        )}
    </Typography>
  );
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

export default Results;
