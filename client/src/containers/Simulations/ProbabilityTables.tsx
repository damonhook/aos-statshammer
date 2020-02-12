import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { AdvancedStatsErrorCard } from 'components/ErrorCards';
import ListItem from 'components/ListItem';
import { TableSkeleton } from 'components/Skeletons';
import _ from 'lodash';
import React from 'react';
import { TError } from 'types/store';

const useStyles = makeStyles(theme => ({
  wrapper: {},
  metricsContainer: {},
  tableContainer: {
    flexGrow: 1,
    flexBasis: '33%',
    maxWidth: '100%',
  },
  tableTitle: {
    paddingBottom: theme.spacing(0, 0, 1),
    textAlign: 'center',
  },
  table: {
    background: theme.palette.background.nested,
    overflowX: 'scroll',
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

interface LoadableProps {
  loading: boolean;
  numUnits: number;
  error?: TError;
}

const Loadable: React.FC<LoadableProps> = React.memo(
  ({ children, loading, numUnits, error }) => {
    const classes = useStyles({ numUnits });

    if (error) {
      return <AdvancedStatsErrorCard />;
    }
    if (loading) {
      return (
        <Grid container spacing={2}>
          {[...Array(6)].map(() => (
            <Grid item className={classes.tableContainer}>
              <TableSkeleton rows={15} cols={numUnits + 1} dense />
            </Grid>
          ))}
        </Grid>
      );
    }
    return <>{children}</>;
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

interface ProbabilityTablesProps {
  pending: boolean;
  probabilities?: any[];
  unitNames: string[];
  className?: string;
  error?: TError;
}

const ProbabilityTables: React.FC<ProbabilityTablesProps> = ({
  pending,
  probabilities,
  unitNames,
  className,
  error,
}) => {
  const classes = useStyles();
  return (
    <ListItem
      header="Probability Tables"
      className={className}
      collapsible
      startCollapsed
      loading={pending}
      loaderDelay={0}
    >
      <Loadable numUnits={unitNames.length} loading={pending} error={error}>
        <Grid container spacing={2} className={classes.metricsContainer}>
          {(probabilities || []).map(({ save, buckets }) => {
            const saveString = save !== 'None' ? `${save}+` : '-';
            return (
              <Grid item className={classes.tableContainer} key={save}>
                <Typography variant="h6" className={classes.tableTitle}>
                  {`Probability against ${saveString} save`}
                </Typography>
                <Paper className={classes.table}>
                  <Table size="small">
                    <TableHead>
                      <TableRow className={classes.header}>
                        <TableCell className={clsx(classes.sticky, classes.header)}>Damage</TableCell>
                        {unitNames.map(name => (
                          <TableCell key={name} className={classes.header}>
                            {name}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {buckets.map(({ damage, ...unitData }) => (
                        <TableRow>
                          <TableCell className={classes.sticky}>{damage}</TableCell>
                          {unitNames.map(name =>
                            unitData[name] ? (
                              <TableCell key={name}>{unitData[name].toFixed(2)}</TableCell>
                            ) : (
                              <TableCell key={name}>0.00</TableCell>
                            ),
                          )}
                        </TableRow>
                      ))}
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

export default ProbabilityTables;
