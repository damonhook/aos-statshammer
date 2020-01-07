import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from 'components/ListItem';
import { AdvancedStatsErrorCard } from 'components/ErrorCards';
import { TableSkeleton } from 'components/Skeletons';
import _ from 'lodash';
import { TError } from 'types/store';

const useStyles = makeStyles(theme => ({
  wrapper: {},
  metricsContainer: {},
  tableContainer: {
    flexGrow: 1,
    flexBasis: '33%',
  },
  tableTitle: {
    paddingBottom: theme.spacing(0, 0, 1),
    textAlign: 'center',
  },
  table: {
    background: theme.palette.background.nested,
  },
}));

interface ILoadableProps {
  loading?: boolean;
  numUnits: number;
  error?: TError;
}

const Loadable: React.FC<ILoadableProps> = React.memo(
  ({ children, loading, numUnits, error }) => {
    const classes = useStyles();

    if (error) {
      return <AdvancedStatsErrorCard />;
    }
    if (loading) {
      return (
        <Grid container spacing={2}>
          {[...Array(6)].map(() => (
            <Grid item className={classes.tableContainer}>
              <TableSkeleton rows={numUnits} cols={5} dense />
            </Grid>
          ))}
        </Grid>
      );
    }
    return <>{children}</>;
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

interface MetricsTablesProps {
  pending: boolean;
  results?: any[];
  unitNames: string[];
  className?: string;
  error?: TError;
}

const MetricsTables: React.FC<MetricsTablesProps> = ({ pending, results, unitNames, className, error }) => {
  const classes = useStyles();

  return (
    <ListItem header="Metric Tables" className={className} collapsible loading={pending} loaderDelay={0}>
      <Loadable loading={pending} error={error} numUnits={unitNames.length}>
        <Grid container spacing={2} className={classes.metricsContainer}>
          {(results || []).map(({ save, ...unitData }) => {
            const saveString = save !== 'None' ? `${save}+` : '-';
            return (
              <Grid item className={classes.tableContainer} key={save}>
                <Typography variant="h6" className={classes.tableTitle}>
                  {`Metrics against ${saveString} save`}
                </Typography>
                <Paper className={classes.table}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Unit Name</TableCell>
                        <TableCell>Mean</TableCell>
                        <TableCell>Median</TableCell>
                        <TableCell>Max</TableCell>
                        <TableCell>Var.</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.keys(unitData).map(k => {
                        const { metrics } = unitData[k];
                        return (
                          <TableRow key={k}>
                            <TableCell>{k}</TableCell>
                            <TableCell>{metrics.mean.toFixed(2)}</TableCell>
                            <TableCell>{metrics.median.toFixed(0)}</TableCell>
                            <TableCell>{metrics.max.toFixed(0)}</TableCell>
                            <TableCell>{Math.abs(metrics.variance).toFixed(2)}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Loadable>
    </ListItem>
  );
};

export default MetricsTables;
