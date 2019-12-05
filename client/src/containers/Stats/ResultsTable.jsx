import React from 'react';
import {
  Table, TableHead, TableBody, TableRow, TableCell, Card,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import TableSkeleton from 'components/Skeletons/TableSkeleton';


const useStyles = makeStyles({
  table: {},
  skeleton: {},
});

const ResultsTable = ({ stats, unitNames, className }) => {
  const classes = useStyles();

  if ((!stats.payload || !stats.payload.length) && stats.pending) {
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
    <Card square>
      <Table size="small" stickyHeader className={clsx(classes.table, className)}>
        <TableHead>
          <TableRow>
            <TableCell>Save</TableCell>
            {unitNames.map((name) => (
              <TableCell align="right" key={name}>{name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.payload.map((result) => {
            const { save, ...unitResults } = result;
            return (
              // eslint-disable-next-line react/no-array-index-key
              <TableRow key={save}>
                <TableCell>{save && save !== 'None' ? `${save}+` : '-'}</TableCell>
                {unitNames.map((name) => (
                  <TableCell key={name} align="right">{unitResults[name]}</TableCell>
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
