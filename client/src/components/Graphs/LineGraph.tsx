import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ReferenceLine,
} from 'recharts';
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
  IReferenceLine,
  ILabel,
} from './graphHelpers';

const useStyles = makeStyles(() => ({
  graph: {},
}));

interface LineGraphProps extends GraphProps {
  referenceLines?: IReferenceLine[];
  xAxisLabel: ILabel;
  yAxisLabel: ILabel;
  dotSize?: number;
}

/**
 * A line graph component for the average damage results
 */
const LineGraph: React.FC<LineGraphProps> = ({
  data,
  series,
  className,
  isAnimationActive,
  title,
  syncId,
  xAxis,
  yAxis,
  xAxisLabel,
  yAxisLabel,
  referenceLines,
  dotSize,
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
        <Tooltip
          content={tooltip || <DefaultTooltip />}
          cursor={{ fill: theme.palette.graphs.grid }}
        />
        <Legend
          formatter={formatLegendEntry}
          onMouseEnter={handleMouseEnter}
          onMouseDown={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {referenceLines &&
          (referenceLines || []).map(({ stroke, dataKey, ...line }) => (
            <ReferenceLine
              stroke={stroke || theme.palette.graphs.axis}
              strokeDasharray="3 3"
              strokeOpacity={dataKey && opacity[dataKey] !== null ? opacity[dataKey] : 1}
              {...line}
            />
          ))}
        {series.map((key, index) => (
          <Line
            type="monotone"
            dataKey={key}
            stroke={theme.palette.graphs.series[index]}
            dot={{ fill: theme.palette.background.paper, strokeWidth: 1, r: dotSize }}
            activeDot={{ stroke: theme.palette.background.paper, strokeWidth: 2, r: 4 }}
            key={key}
            isAnimationActive={isAnimationActive}
            connectNulls
            opacity={opacity[key]}
            onAnimationEnd={handleAnimationEnd}
          />
        ))}
      </LineChart>
    </GraphContainer>
  );
};

LineGraph.defaultProps = {
  isAnimationActive: true,
  yAxis: {},
  dotSize: 2,
};

export default LineGraph;
