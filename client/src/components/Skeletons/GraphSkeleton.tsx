import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    verticalAlign: 'bottom',
  },
  bar: {
    flex: 1,
    height: '100%',
    marginTop: 'auto',
  },
  series: {
    marginRight: theme.spacing(2),
    display: 'flex',
    flex: 1,

    '&:last-child': {
      marginRight: 0,
    },
  },
  group: {
    marginRight: theme.spacing(1),
    flex: 1,
    display: 'flex',
    height: '100%',

    '&:last-child': {
      marginRight: 0,
    },
  },
}));

interface IGraphSkeletonProps {
  series: number;
  groups: number;
  className?: string;
  height: number;
}

/**
 * A skeleton component used to indicate that there is graph loading in its place
 */
const GraphSkeleton: React.FC<IGraphSkeletonProps> = ({ series, groups, className, height }) => {
  const classes = useStyles();

  const randomIntFromInterval = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  return (
    <div className={clsx(className, classes.root)} style={{ height: `${height}px` }}>
      {[...Array(series)].map((_, seriesKey) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className={classes.series} key={seriesKey}>
          {[...Array(groups)].map((_, groupKey) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className={classes.group} key={groupKey}>
              <Skeleton
                variant="rect"
                className={classes.bar}
                height={`${randomIntFromInterval(30, 100)}%`}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GraphSkeleton;
