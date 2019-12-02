import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import GraphContainer from './GraphContainer';


const useStyles = makeStyles({
  graph: {},
});

const LineGraph = ({
  results, unitNames, className, colors,
}) => {
  const classes = useStyles();

  return (
    <GraphContainer className={clsx(classes.graph, className)}>
      <LineChart
        data={results}
        // margin={{ left: -20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="save" />
        <YAxis />
        <Tooltip />
        <Legend />
        {unitNames.map((name, index) => (
          <Line type="monotone" dataKey={name} stroke={colors[index]} />
        ))}
      </LineChart>
    </GraphContainer>
  );
};

export default LineGraph;
