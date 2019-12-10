import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    height: `${props.height}px`,
    display: 'flex',
    flexDirection: 'row',
    verticalAlign: 'bottom',
  }),
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

const GraphSkeleton = ({
  series, groups, className, height,
}) => {
  const classes = useStyles({ height });

  const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  return (
    <div className={clsx(className, classes.root)}>
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
