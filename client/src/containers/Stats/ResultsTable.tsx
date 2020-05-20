import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { StatsErrorCard } from 'components/ErrorCards';
import TableSkeleton from 'components/Skeletons/TableSkeleton';
import React from 'react';
import type { IStatsStore } from 'types/store';

const useStyles = makeStyles((theme) => ({
  table: {
    background: theme.palette.background.nested,
  },
  skeleton: {},
  container: {
    overflowX: 'auto',
  },
  sticky: {
    position: 'sticky',
    left: 0,
    zIndex: 11,
    backgroundColor: theme.palette.background.nested,
  },
  header: {
    fontWeight: theme.typography.fontWeightBold,
  },
  cell: {
    background: theme.palette.background.nested,
  },
  error: {
    width: 'auto',
    height: theme.spacing(30),
  },
}));

interface IResultsTableProps {
  stats: IStatsStore;
  unitNames: string[];
  className?: string;
}

const ResultsTable: React.FC<IResultsTableProps> = ({ stats, unitNames, className }) => {
  const classes = useStyles();
  if (stats.error) {
    return <StatsErrorCard className={classes.error} />;
  }
  if (!stats?.payload?.length) {
    return (
      <TableSkeleton
        dense
        rows={6}
        cols={unitNames && unitNames.length ? unitNames.length + 1 : 2}
        className={classes.skeleton}
      />
    );
  }
  return (
    <Paper className={classes.container}>
      <Table size="small" className={clsx(classes.table, className)}>
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell className={clsx(classes.sticky, classes.header)}>Save</TableCell>
            {unitNames.map((name) => (
              <TableCell align="right" key={name} className={classes.header}>
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.payload.map((result) => {
            const { save, ...unitResults } = result;
            return (
              // eslint-disable-next-line react/no-array-index-key
              <TableRow key={save}>
                <TableCell className={clsx(classes.sticky, classes.cell)}>
                  {save && save !== 'None' ? `${save}+` : '-'}
                </TableCell>
                {unitNames.map((name) => (
                  <TableCell key={name} align="right">
                    {unitResults[name]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ResultsTable;
