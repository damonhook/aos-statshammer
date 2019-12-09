import React from 'react';
import PropTypes from 'prop-types';
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
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="save" />
        <YAxis />
        <Tooltip />
        <Legend />
        {unitNames.map((name, index) => (
          <Bar type="monotone" dataKey={name} fill={colors[index]} key={name} />
        ))}
      </BarChart>
    </GraphContainer>
  );
};

BarGraph.defaultProps = {
  results: [],
  className: null,
};

BarGraph.propTypes = {
  /** The array of results to display in the graph */
  results: PropTypes.arrayOf(PropTypes.object),
  /** An array containing the Unit names, used for the data key */
  unitNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** CSS classname to give the component */
  className: PropTypes.string,
  /** An array of hex colors to use when generating the graph bars */
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BarGraph;
