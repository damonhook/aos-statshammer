import React from 'react';
import PropTypes from 'prop-types';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import GraphContainer from './GraphContainer';
import GraphTooltip from './GraphTooltip';


const useStyles = makeStyles({
  graph: {},
});


/**
 * A bar graph component for the average damage results
 */
const BarGraph = ({
  results, unitNames, className,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <GraphContainer className={clsx(classes.graph, className)}>
      <BarChart
        data={results}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.graphs.grid} />
        <XAxis dataKey="save" stroke={theme.palette.graphs.axis} />
        <YAxis stroke={theme.palette.graphs.axis} />
        <Tooltip content={<GraphTooltip />} cursor={{ fill: theme.palette.graphs.grid }} />
        <Legend />
        {unitNames.map((name, index) => (
          <Bar
            type="monotone"
            dataKey={name}
            fill={theme.palette.graphs.series[index]}
            key={name}
          />
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
};

export default BarGraph;
