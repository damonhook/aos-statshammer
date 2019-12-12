import React from 'react';
import PropTypes from 'prop-types';
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

/**
 * A skeleton component used to indicate that there is graph loading in its place
 */
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

GraphSkeleton.defaultProps = {
  className: null,
};

GraphSkeleton.propTypes = {
  /** The number of placeholder series to display */
  series: PropTypes.number.isRequired,
  /** The number of placeholder groups to display */
  groups: PropTypes.number.isRequired,
  /** Any optional class names to apply to the component */
  className: PropTypes.string,
  /** How heigh (in `px`) to render the graph */
  height: PropTypes.number.isRequired,
};

export default GraphSkeleton;
