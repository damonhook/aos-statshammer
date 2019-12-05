import React from 'react';
import PropTypes from 'prop-types';
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
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="save" />
        <YAxis />
        <Tooltip />
        <Legend />
        {unitNames.map((name, index) => (
          <Line type="monotone" dataKey={name} stroke={colors[index]} key={name} />
        ))}
      </LineChart>
    </GraphContainer>
  );
};

LineGraph.defaultProps = {
  className: null,
};

LineGraph.propTypes = {
  /** The array of results to display in the graph */
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** An array containing the Unit names, used for the data key */
  unitNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** CSS classname to give the component */
  className: PropTypes.string,
  /** An array of hex colors to use when generating the graph lines */
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default LineGraph;
