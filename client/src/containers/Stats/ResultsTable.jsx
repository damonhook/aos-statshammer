import React from 'react';
import {
  Table, TableHead, TableBody, TableRow, TableCell, Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import TableSkeleton from 'components/Skeletons/TableSkeleton';
import StatsErrorCard from 'components/StatsErrorCard';


const useStyles = makeStyles((theme) => ({
  table: {},
  skeleton: {},
  container: {
    overflowX: 'scroll',
  },
  sticky: {
    position: 'sticky',
    left: 0,
    zIndex: 11,
  },
  header: {
    backgroundColor: theme.palette.grey[50],
  },
  cell: {
    background: 'white',
  },
  error: {
    width: 'auto',
    height: theme.spacing(30),
  },
}));

const ResultsTable = ({ stats, unitNames, className }) => {
  const classes = useStyles();
  if (stats.error) {
    return <StatsErrorCard className={classes.error} />;
  }
  if ((!stats.payload || !stats.payload.length)) {
    return (
      <TableSkeleton
        dense
        rows={7}
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
              <TableCell align="right" key={name} className={classes.header}>{name}</TableCell>
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
                  <TableCell key={name} align="right">{unitResults[name]}</TableCell>
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
