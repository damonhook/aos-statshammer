import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { DefaultTooltip } from 'components/GraphTooltips';
import React, { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ErrorBarProps,
  Label,
  Legend,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import GraphContainer from './GraphContainer';
import {
  getInitOpacity,
  getLegendFormatter,
  getMouseEnterHandler,
  getMouseLeaveHandler,
  GraphProps,
  ILabel,
  IReferenceLine,
} from './graphHelpers';

const useStyles = makeStyles({
  graph: {},
});

interface IBarGraphProps extends GraphProps {
  referenceLines?: IReferenceLine[];
  xAxisLabel?: ILabel;
  yAxisLabel?: ILabel;
  errorBars?: ErrorBarProps;
}

/**
 * A bar graph component for the average damage results
 */
const BarGraph: React.FC<IBarGraphProps> = ({
  data,
  series,
  className,
  isAnimationActive = true,
  title,
  syncId,
  xAxis,
  yAxis = {},
  xAxisLabel,
  yAxisLabel,
  referenceLines,
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
      <BarChart data={data} syncId={syncId}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.graphs.grid} />
        <XAxis stroke={theme.palette.graphs.axis} {...xAxis}>
          {xAxisLabel && xAxisLabel.value && (
            <Label
              value={xAxisLabel.value}
              angle={0}
              position={xAxisLabel.position ?? 'center'}
              offset={xAxisLabel.offset ?? 10}
              fill={theme.palette.graphs.axis}
            />
          )}
        </XAxis>
        <YAxis stroke={theme.palette.graphs.axis} {...yAxis}>
          {yAxisLabel && yAxisLabel.value && (
            <Label
              value={yAxisLabel.value}
              angle={-90}
              position={yAxisLabel.position ?? 'insideBottomLeft'}
              offset={yAxisLabel.offset ?? 10}
              fill={theme.palette.graphs.axis}
            />
          )}
        </YAxis>
        <Tooltip content={tooltip ?? <DefaultTooltip />} cursor={{ fill: theme.palette.graphs.grid }} />
        <Legend
          formatter={formatLegendEntry}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {referenceLines &&
          (referenceLines ?? []).map(({ stroke, dataKey, ...line }) => (
            <ReferenceLine
              stroke={stroke ?? theme.palette.graphs.axis}
              strokeDasharray="3 3"
              strokeOpacity={dataKey && opacity[dataKey] !== null ? opacity[dataKey] : 1}
              {...line}
            />
          ))}
        {series.map((key, index) => (
          <Bar
            dataKey={key}
            fill={theme.palette.graphs.series[index]}
            key={key}
            isAnimationActive={isAnimationActive}
            opacity={opacity[key]}
            onAnimationEnd={handleAnimationEnd}
          />
        ))}
      </BarChart>
    </GraphContainer>
  );
};

export default BarGraph;
