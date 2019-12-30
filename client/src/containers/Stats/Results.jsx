import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Typography, Button, useMediaQuery, Tooltip,
} from '@material-ui/core';
import ListItem from 'components/ListItem';
import _ from 'lodash';
import Graphs from 'containers/Graphs';
import { GetApp, BarChart } from '@material-ui/icons';
import ResultsTable from './ResultsTable';

const useStyles = makeStyles({
  results: {},
});

const Results = React.memo(({ stats, unitNames, className }) => {
  const classes = useStyles();
  const theme = useTheme();
  const firstLoad = (!stats.payload || !stats.payload.length) && stats.pending;
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const downloadDisabled = unitNames.length <= 0;

  return (
    <Typography className={clsx(classes.results, className)} component="div">
      {!mobile && (
        <Tooltip title="View more advanced stats (like full probability curves), calculated through simulations">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<BarChart />}
            disabled={downloadDisabled}
            style={{ marginBottom: theme.spacing(2) }}
            size={mobile ? 'large' : 'medium'}
            href="/advanced"
          >
            Advanced Stats
          </Button>
        </Tooltip>
      )}
      <ListItem
        header="Average Damage Table"
        collapsible
        loading={stats.pending}
        loaderDelay={firstLoad ? 0 : 350}
      >
        <ResultsTable stats={stats} unitNames={unitNames} />
      </ListItem>
      <Graphs stats={stats} unitNames={unitNames} />
      {!mobile && (
        <Button
          href="/pdf"
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<GetApp />}
          disabled={downloadDisabled}
          style={{ marginBottom: theme.spacing(1) }}
        >
          Download PDF
        </Button>
      )}
    </Typography>
  );
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

export default Results;
