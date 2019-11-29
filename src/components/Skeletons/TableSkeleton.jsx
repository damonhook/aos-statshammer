import React from 'react';
import {
  Card, CardContent, Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  content: {
    paddingTop: '14px',
    paddingBottom: '16px !important',
  },
  skeleton: {
    display: 'flex',
    flexDirection: 'column',
    height: '2.6em',
  },
  dense: {
    height: '1.8em',
  },
  header: {
    marginBottom: '.5em',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  col: {
    flex: 1,
    marginRight: '1em',

    '&:last-child': {
      marginRight: 0,
    },
  },
});

const TableSkeleton = ({
  rows, cols, dense, className,
}) => {
  const classes = useStyles();

  const cName = clsx(classes.skeleton, dense ? classes.dense : '');
  return (
    <Card className={clsx(className)}>
      <CardContent className={classes.content}>
        <Skeleton variant="rect" className={clsx(cName, classes.header)} />
        {[...Array(rows)].map(() => (
          <Typography className={classes.row}>
            {[...Array(cols)].map(() => (
              <Skeleton variant="text" className={clsx(cName, classes.col)} />
            ))}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};


export default TableSkeleton;
