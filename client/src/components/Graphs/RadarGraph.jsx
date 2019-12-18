import React from 'react';
import PropTypes from 'prop-types';
import {
  RadarChart,
  Radar,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  PolarGrid,
} from 'recharts';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import GraphContainer from './GraphContainer';
import GraphTooltip from './GraphTooltip';


const useStyles = makeStyles({
  graph: {
    paddingTop: '0 !important',
  },
});

/**
 * A radar graph component for the average damage results
 */
const RadarGraph = ({
  results, unitNames, className, outerRadius, isAnimationActive,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const radarAxisLabel = (value) => (value === 'None' ? '-' : `${value}+`);
  const formatLegendEntry = (value) => (
    <span style={{ color: theme.palette.getContrastText(theme.palette.background.paper) }}>
      {value}
    </span>
  );

  return (
    <GraphContainer className={clsx(classes.graph, className)}>
      <RadarChart data={results} outerRadius={outerRadius} cy={outerRadius > 100 ? '40%' : '45%'}>
        <PolarGrid stroke={theme.palette.graphs.grid} />
        <PolarAngleAxis
          dataKey="save"
          stroke={theme.palette.graphs.axis}
          tickFormatter={radarAxisLabel}
        />
        <PolarRadiusAxis stroke={theme.palette.graphs.axis} angle={0} />
        <Tooltip content={<GraphTooltip />} />
        <Legend formatter={formatLegendEntry} />
        {unitNames.map((name, index) => (
          <Radar
            type="monotone"
            dataKey={name}
            stroke={theme.palette.graphs.series[index]}
            fill={theme.palette.graphs.series[index]}
            activeDot={{ stroke: theme.palette.background.paper }}
            fillOpacity={0.1}
            key={name}
            isAnimationActive={isAnimationActive}
          />
        ))}
      </RadarChart>

    </GraphContainer>
  );
};

RadarGraph.defaultProps = {
  results: [],
  className: null,
  outerRadius: 120,
  isAnimationActive: true,
};

RadarGraph.propTypes = {
  /** The array of results to display in the graph */
  results: PropTypes.arrayOf(PropTypes.object),
  /** An array containing the Unit names, used for the data key */
  unitNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** CSS classname to give the component */
  className: PropTypes.string,
  outerRadius: PropTypes.number,
  /** Whether the play animations for the components */
  isAnimationActive: PropTypes.bool,
};


export default RadarGraph;
