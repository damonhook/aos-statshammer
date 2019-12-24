import React, { useState, useEffect } from 'react';
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
import {
  getLegendFormatter, getMouseEnterHandler, getMouseLeaveHandler, getInitOpacity,
} from './graphHelpers';


const useStyles = makeStyles({
  graph: {
    paddingTop: '0 !important',
  },
});

/**
 * A radar graph component for the average damage results
 */
const RadarGraph = ({
  data, series, className, isAnimationActive, outerRadius, title, syncId, xAxis, yAxis, tooltip,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [opacity, setOpacity] = useState({});

  const handleMouseEnter = getMouseEnterHandler(opacity, setOpacity);
  const handleMouseLeave = getMouseLeaveHandler(opacity, setOpacity);
  const formatLegendEntry = getLegendFormatter(theme, opacity);

  useEffect(() => {
    setOpacity(getInitOpacity(series));
  }, [series]);

  const handleAnimationEnd = () => {
    setOpacity(getInitOpacity(series));
  };

  return (
    <GraphContainer className={clsx(classes.graph, className)} title={title}>
      <RadarChart
        data={data}
        outerRadius={outerRadius}
        cy={outerRadius > 100 ? '40%' : '45%'}
        syncId={syncId}
      >
        <PolarGrid stroke={theme.palette.graphs.grid} />
        <PolarAngleAxis stroke={theme.palette.graphs.axis} {...xAxis} />
        <PolarRadiusAxis stroke={theme.palette.graphs.axis} angle={0} {...yAxis} />
        <Tooltip content={tooltip} />
        <Legend
          formatter={formatLegendEntry}
          onMouseEnter={handleMouseEnter}
          onMouseDown={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {series.map((key, index) => (
          <Radar
            type="monotone"
            dataKey={key}
            stroke={theme.palette.graphs.series[index]}
            fill={theme.palette.graphs.series[index]}
            activeDot={{ stroke: theme.palette.background.paper }}
            fillOpacity={opacity[key] === 1 ? 0.1 : 0}
            strokeOpacity={opacity[key]}
            key={key}
            isAnimationActive={isAnimationActive}
            onAnimationEnd={handleAnimationEnd}
          />
        ))}
      </RadarChart>
    </GraphContainer>
  );
};

RadarGraph.defaultProps = {
  className: null,
  isAnimationActive: true,
  syncId: null,
  xAxis: {},
  yAxis: {},
  xAxisLabel: null,
  yAxisLabel: null,
  referenceLines: null,
  outerRadius: 120,
  tooltip: null,
};

RadarGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  series: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  isAnimationActive: PropTypes.bool,
  title: PropTypes.string.isRequired,
  syncId: PropTypes.string,
  xAxis: PropTypes.shape({
    tickFormatter: PropTypes.func,
    domain: PropTypes.array,
    type: PropTypes.string,
    ticks: PropTypes.array,
    dataKey: PropTypes.string,
    tickCount: PropTypes.number,
  }),
  yAxis: PropTypes.shape({
    tickFormatter: PropTypes.func,
    domain: PropTypes.array,
    type: PropTypes.string,
    ticks: PropTypes.array,
    dataKey: PropTypes.string,
    tickCount: PropTypes.number,
  }),
  xAxisLabel: PropTypes.shape({
    value: PropTypes.string,
    position: PropTypes.string,
    offset: PropTypes.number,
  }),
  yAxisLabel: PropTypes.shape({
    value: PropTypes.string,
    position: PropTypes.string,
    offset: PropTypes.number,
  }),
  referenceLines: PropTypes.arrayOf(PropTypes.object),
  outerRadius: PropTypes.number,
  tooltip: PropTypes.node,
};

export default RadarGraph;
