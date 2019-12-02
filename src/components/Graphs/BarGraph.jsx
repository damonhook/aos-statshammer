import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import GraphContainer from './GraphContainer';


const useStyles = makeStyles({
  graph: {},
});

const BarGraph = ({
  results, unitNames, className, colors,
}) => {
  const classes = useStyles();

  return (
    <GraphContainer className={clsx(classes.graph, className)}>
      <BarChart
        data={results}
        // margin={{ left: -20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="save" />
        <YAxis />
        <Tooltip />
        <Legend />
        {unitNames.map((name, index) => (
          <Bar type="monotone" dataKey={name} fill={colors[index]} />
        ))}
      </BarChart>
    </GraphContainer>
  );
};

export default BarGraph;
