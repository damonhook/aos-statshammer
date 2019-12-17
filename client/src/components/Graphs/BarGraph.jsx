import React from 'react';
import PropTypes from 'prop-types';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label,
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
  results, unitNames, className, isAnimationActive,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const xAxisLabel = (value) => (value === 'None' ? '-' : `${value}+`);

  return (
    <GraphContainer className={clsx(classes.graph, className)}>
      <BarChart
        data={results}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.graphs.grid} />
        <XAxis dataKey="save" stroke={theme.palette.graphs.axis} tickFormatter={xAxisLabel} />
        <YAxis stroke={theme.palette.graphs.axis}>
          <Label
            value="Average Damage"
            angle={-90}
            position="insideLeft"
            fill={theme.palette.graphs.axis}
          />
        </YAxis>
        <Tooltip content={<GraphTooltip />} cursor={{ fill: theme.palette.graphs.grid }} />
        <Legend />
        {unitNames.map((name, index) => (
          <Bar
            type="monotone"
            dataKey={name}
            fill={theme.palette.graphs.series[index]}
            key={name}
            isAnimationActive={isAnimationActive}
          />
        ))}
      </BarChart>
    </GraphContainer>
  );
};

BarGraph.defaultProps = {
  results: [],
  className: null,
  isAnimationActive: true,
};

BarGraph.propTypes = {
  /** The array of results to display in the graph */
  results: PropTypes.arrayOf(PropTypes.object),
  /** An array containing the Unit names, used for the data key */
  unitNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** CSS classname to give the component */
  className: PropTypes.string,
  /** Whether the play animations for the components */
  isAnimationActive: PropTypes.bool,
};

export default BarGraph;
