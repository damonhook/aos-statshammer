import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { SimulationsErrorCard } from 'components/ErrorCards';
import ListItem from 'components/ListItem';
import { TableSkeleton } from 'components/Skeletons';
import React, { useMemo } from 'react';
import type { ISimulationResult } from 'types/simulations';
import type { TError } from 'types/store';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {},
  metricsContainer: {},
  tableContainer: {
    flexGrow: 1,
    flexBasis: '50%',
    maxWidth: '100%',
  },
  tableTitle: {
    paddingBottom: theme.spacing(0, 0, 1),
    textAlign: 'center',
  },
  table: {
    background: theme.palette.background.nested,
    overflowX: 'auto',
  },
  header: {
    fontWeight: theme.typography.fontWeightBold,
  },
  sticky: {
    position: 'sticky',
    left: 0,
    zIndex: 11,
    backgroundColor: theme.palette.background.nested,
  },
}));

interface ILoadableProps {
  loading?: boolean;
  numUnits: number;
  error?: TError;
  children?: React.ReactNode;
}
const Loadable = ({ children, loading, numUnits, error }: ILoadableProps) => {
  const classes = useStyles();

  if (error) {
    return <SimulationsErrorCard />;
  }
  if (loading) {
    return (
      <Grid container spacing={2}>
        {[...Array(6)].map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid item className={classes.tableContainer} key={index}>
            <TableSkeleton rows={numUnits} cols={5} dense />
          </Grid>
        ))}
      </Grid>
    );
  }
  return <>{children}</>;
};

interface IMetricsTablesProps {
  pending: boolean;
  results?: ISimulationResult[];
  unitNames: string[];
  className?: string;
  error?: TError;
}
const MetricsTables = ({ pending, results, unitNames, className, error }: IMetricsTablesProps) => {
  const classes = useStyles();

  const data = useMemo(() => {
    if (pending || !results) return [];
    return results.map(({ save, metrics }) => ({ save, metrics }));
  }, [pending, results]);

  return (
    <ListItem header="Metric Tables" className={className} collapsible loading={pending} loaderDelay={0}>
      <Loadable loading={pending} error={error} numUnits={unitNames.length}>
        <Grid container spacing={2} className={classes.metricsContainer}>
          {data.map(({ save, metrics }) => {
            const saveString = save ? `${save}+` : '-';
            return (
              <Grid item className={classes.tableContainer} key={save}>
                <Typography variant="h6" className={classes.tableTitle}>
                  {`Metrics against ${saveString} save`}
                </Typography>
                <Paper className={classes.table}>
                  <Table size="small">
                    <TableHead>
                      <TableRow className={classes.header}>
                        <TableCell className={clsx(classes.sticky, classes.header)}>Unit Name</TableCell>
                        <TableCell className={classes.header}>Mean</TableCell>
                        <TableCell className={classes.header}>Max</TableCell>
                        <TableCell className={classes.header}>Var.</TableCell>
                        <TableCell className={classes.header}>Std. Dev.</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {unitNames.map((name) => {
                        return (
                          <TableRow key={name}>
                            <TableCell className={classes.sticky}>{name}</TableCell>
                            <TableCell>{metrics.mean[name].toFixed(2)}</TableCell>
                            <TableCell>{metrics.max[name].toFixed(0)}</TableCell>
                            <TableCell>{metrics.variance[name].toFixed(2)}</TableCell>
                            <TableCell>
                              {metrics.standardDeviation[name]
                                ? metrics.standardDeviation[name].toFixed(2)
                                : '<0.01'}
                            </TableCell>
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
