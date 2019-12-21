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
import GraphTooltip from './GraphTooltip';
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
  data, series, className, isAnimationActive, outerRadius, title, syncId, xAxis, yAxis,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [opacity, setOpacity] = useState({});
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (!firstLoad) {
      setOpacity(getInitOpacity(series));
    }
  }, [firstLoad, series]);

  const handleMouseEnter = getMouseEnterHandler(opacity, setOpacity);
  const handleMouseLeave = getMouseLeaveHandler(opacity, setOpacity);
  const formatLegendEntry = getLegendFormatter(theme, opacity);

  const handleAnimationEnd = () => {
    setFirstLoad(false);
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
        <Tooltip content={<GraphTooltip />} />
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
  data: [],
  className: null,
  outerRadius: 120,
  isAnimationActive: true,
  xAxis: {},
  yAxis: {},
};

RadarGraph.propTypes = {
  /** The array of results to display in the graph */
  // results: PropTypes.arrayOf(PropTypes.object),
  /** An array containing the Unit names, used for the data key */
  // unitNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** CSS classname to give the component */
  className: PropTypes.string,
  outerRadius: PropTypes.number,
  /** Whether the play animations for the components */
  isAnimationActive: PropTypes.bool,
};


export default RadarGraph;
