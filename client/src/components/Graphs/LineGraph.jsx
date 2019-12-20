import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label,
} from 'recharts';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import GraphContainer from './GraphContainer';
import GraphTooltip from './GraphTooltip';


const useStyles = makeStyles(() => ({
  graph: {},
}));

/**
 * A line graph component for the average damage results
 */
const LineGraph = ({
  data, series, className, isAnimationActive, title, syncId, xAxis, yAxis, xAxisLabel, yAxisLabel,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const formatLegendEntry = (value) => (
    <span style={{ color: theme.palette.getContrastText(theme.palette.background.paper) }}>
      {value}
    </span>
  );

  return (
    <GraphContainer className={clsx(classes.graph, className)} title={title}>
      <LineChart data={data} syncId={syncId}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.graphs.grid} />
        <XAxis stroke={theme.palette.graphs.axis} {...xAxis}>
          {xAxisLabel && xAxisLabel.value && (
            <Label
              value={xAxisLabel.value}
              angle={0}
              position={xAxisLabel.position || 'center'}
              offset={xAxisLabel.offset || 10}
              fill={theme.palette.graphs.axis}
            />
          )}
        </XAxis>
        <YAxis stroke={theme.palette.graphs.axis} {...yAxis}>
          {yAxisLabel && yAxisLabel.value && (
            <Label
              value={yAxisLabel.value}
              angle={-90}
              position={yAxisLabel.position || 'insideBottomLeft'}
              offset={yAxisLabel.offset || 10}
              fill={theme.palette.graphs.axis}
            />
          )}
        </YAxis>
        <Tooltip content={<GraphTooltip />} />
        <Legend formatter={formatLegendEntry} />
        {series.map((key, index) => (
          <Line
            type="monotone"
            dataKey={key}
            stroke={theme.palette.graphs.series[index]}
            dot={{ fill: theme.palette.background.paper, strokeWidth: 1, r: 2 }}
            activeDot={{ stroke: theme.palette.background.paper, strokeWidth: 2, r: 5 }}
            key={key}
            isAnimationActive={isAnimationActive}
            connectNulls
          />
        ))}
      </LineChart>
    </GraphContainer>
  );
};

LineGraph.defaultProps = {
  // results: [],
  className: null,
  isAnimationActive: true,
  xAxis: {},
  yAxis: {},
};

// LineGraph.propTypes = {
//   /** The array of results to display in the graph */
//   results: PropTypes.arrayOf(PropTypes.object),
//   /** An array containing the Unit names, used for the data key */
//   unitNames: PropTypes.arrayOf(PropTypes.string).isRequired,
//   /** CSS classname to give the component */
//   className: PropTypes.string,
//   /** Whether the play animations for the components */
//   isAnimationActive: PropTypes.bool,
// };


export default LineGraph;
