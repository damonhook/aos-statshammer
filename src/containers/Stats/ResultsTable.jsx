import React from 'react';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import TableSkeleton from 'components/Skeletons/TableSkeleton';
import Card from 'components/Card';


const useStyles = makeStyles({
  table: {},
  skeleton: {},
});

const ResultsTable = ({ stats, unitNames, className }) => {
  const classes = useStyles();

  if (stats.pending) {
    return (
      <TableSkeleton
        dense
        rows={7}
        cols={unitNames && unitNames.length ? unitNames.length + 1 : 2}
        className={classes.skeleton}
      />
    );
  }
  if (!stats || !stats.payload || !stats.payload.length) {
    return null;
  }
  return (
    <Card>
      <Table size="small" stickyHeader className={clsx(classes.table, className)}>
        <TableHead>
          <TableRow>
            <TableCell>Save</TableCell>
            {unitNames.map((name) => (
              <TableCell>{name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.payload.map((result) => {
            const { save, ...unitResults } = result;
            return (
              <TableRow>
                <TableCell>{save && save !== 'None' ? `${save}+` : '-'}</TableCell>
                {unitNames.map((name) => (
                  <TableCell>{unitResults[name]}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ResultsTable;
