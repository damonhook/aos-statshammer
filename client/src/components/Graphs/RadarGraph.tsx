import React, { useState, useEffect } from 'react';
import { RadarChart, Radar, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend, PolarGrid } from 'recharts';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { DefaultTooltip } from 'components/GraphTooltips';
import GraphContainer from './GraphContainer';
import {
  getLegendFormatter,
  getMouseEnterHandler,
  getMouseLeaveHandler,
  getInitOpacity,
  GraphProps,
} from './graphHelpers';

const useStyles = makeStyles({
  graph: {
    paddingTop: '0 !important',
  },
});

interface RadarGraphProps extends GraphProps {
  outerRadius?: number;
}

/**
 * A radar graph component for the average damage results
 */
const RadarGraph: React.FC<RadarGraphProps> = ({
  data,
  series,
  className,
  isAnimationActive,
  outerRadius,
  title,
  syncId,
  xAxis,
  yAxis,
  tooltip,
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
        cy={outerRadius && outerRadius > 100 ? '40%' : '45%'}
        syncId={syncId}
      >
        <PolarGrid stroke={theme.palette.graphs.grid} />
        <PolarAngleAxis stroke={theme.palette.graphs.axis} {...xAxis} />
        <PolarRadiusAxis stroke={theme.palette.graphs.axis} angle={0} {...yAxis} />
        <Tooltip content={tooltip || <DefaultTooltip />} cursor={{ fill: theme.palette.graphs.grid }} />
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
  isAnimationActive: true,
  yAxis: {},
  outerRadius: 120,
};

export default RadarGraph;
