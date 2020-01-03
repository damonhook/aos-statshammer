import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
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

interface ITableSkeletonProps {
  rows: number;
  cols: number;
  dense?: boolean;
  className?: string;
}

/**
 * A skeleton component used to indicate that there is table loading in its place
 */
const TableSkeleton: React.FC<ITableSkeletonProps> = ({ rows, cols, dense = false, className }) => {
  const classes = useStyles();

  const cName = clsx(classes.skeleton, dense ? classes.dense : '');
  return (
    <Card className={clsx(className)} square>
      <CardContent className={classes.content}>
        <Skeleton variant="rect" className={clsx(cName, classes.header)} />
        {[...Array(rows)].map((_, rowKey) => (
          // eslint-disable-next-line react/no-array-index-key
          <Typography className={classes.row} key={rowKey} component="div">
            {[...Array(cols)].map((_, colKey) => (
              // eslint-disable-next-line react/no-array-index-key
              <Skeleton variant="text" className={clsx(cName, classes.col)} key={colKey} />
            ))}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default TableSkeleton;
