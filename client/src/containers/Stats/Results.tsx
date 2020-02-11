import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Typography, Button, useMediaQuery, Tooltip } from '@material-ui/core';
import ListItem from 'components/ListItem';
import _ from 'lodash';
import Graphs from 'containers/Graphs';
import { GetApp, BarChart } from '@material-ui/icons';
import TargetSummary from 'components/TargetSummary';
import { IStatsStore } from 'types/store';
import { ROUTES } from 'utils/urls';
import ResultsTable from './ResultsTable';

const useStyles = makeStyles({
  results: {},
});

interface IResultsProps {
  stats: IStatsStore;
  unitNames: string[];
  className?: string;
}

const Results: React.FC<IResultsProps> = React.memo(
  ({ stats, unitNames, className }) => {
    const classes = useStyles();
    const theme = useTheme();
    const firstLoad = !stats?.payload?.length && stats?.pending;
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.up('lg'));

    const downloadDisabled = unitNames.length <= 0;

    return (
      <Typography className={clsx(classes.results, className)} component="div">
        <TargetSummary />
        {!mobile && !lg && (
          <Tooltip
            title={`View more advanced stats (like full probability curves), 
            calculated through simulations`}
          >
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<BarChart />}
              disabled={downloadDisabled}
              style={{ marginBottom: theme.spacing(2) }}
              href={ROUTES.SIMULATIONS}
            >
              Simulations
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
        {!mobile && !lg && (
          <Button
            href={ROUTES.PDF}
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<GetApp />}
            disabled={downloadDisabled}
            style={{ marginBottom: theme.spacing(2) }}
          >
            Download PDF
          </Button>
        )}
      </Typography>
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

export default Results;
