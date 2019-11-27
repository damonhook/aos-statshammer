import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { ResponsiveContainer } from 'recharts';


const useSyles = makeStyles({
  container: {},
  responsive: {
    margin: 'auto',
  },
});


const GraphContainer = ({ className, children }) => {
  const classes = useSyles();

  return (
    <div className={clsx(classes.container, className)}>
      <ResponsiveContainer width="98%" className={classes.responsive}>
        {children}
      </ResponsiveContainer>
    </div>
  );
};


export default GraphContainer;
