import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import GraphContainer from './GraphContainer';
import GraphTooltip from './GraphTooltip';


const useStyles = makeStyles(() => ({
  graph: {},
}));

const LineGraph = ({
  results, unitNames, className,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <GraphContainer className={clsx(classes.graph, className)}>
      <LineChart
        data={results}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.graphs.grid} />
        <XAxis dataKey="save" stroke={theme.palette.graphs.axis} />
        <YAxis stroke={theme.palette.graphs.axis} />
        <Tooltip content={<GraphTooltip />} />
        <Legend />
        {unitNames.map((name, index) => (
          <Line
            type="monotone"
            dataKey={name}
            stroke={theme.palette.graphs.series[index]}
            dot={{ fill: theme.palette.background.paper, strokeWidth: 1 }}
            activeDot={{ stroke: theme.palette.background.paper, strokeWidth: 2, r: 6 }}
            key={name}
          />
        ))}
      </LineChart>
    </GraphContainer>
  );
};

LineGraph.defaultProps = {
  results: [],
  className: null,
};

LineGraph.propTypes = {
  /** The array of results to display in the graph */
  results: PropTypes.arrayOf(PropTypes.object),
  /** An array containing the Unit names, used for the data key */
  unitNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** CSS classname to give the component */
  className: PropTypes.string,
};


export default LineGraph;
