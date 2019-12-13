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
  results, unitNames, className,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <GraphContainer className={clsx(classes.graph, className)}>
      <RadarChart data={results} outerRadius={120} cy="40%">
        <PolarGrid stroke={theme.palette.graphs.grid} />
        <PolarAngleAxis dataKey="save" stroke={theme.palette.graphs.axis} />
        <PolarRadiusAxis stroke={theme.palette.graphs.axis} angle={0} />
        <Tooltip content={<GraphTooltip />} />
        <Legend />
        {unitNames.map((name, index) => (
          <Radar
            type="monotone"
            dataKey={name}
            stroke={theme.palette.graphs.series[index]}
            fill={theme.palette.graphs.series[index]}
            activeDot={{ stroke: theme.palette.background.paper }}
            fillOpacity={0.1}
            key={name}
          />
        ))}
      </RadarChart>

    </GraphContainer>
  );
};

RadarGraph.defaultProps = {
  results: [],
  className: null,
};

RadarGraph.propTypes = {
  /** The array of results to display in the graph */
  results: PropTypes.arrayOf(PropTypes.object),
  /** An array containing the Unit names, used for the data key */
  unitNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** CSS classname to give the component */
  className: PropTypes.string,
};


export default RadarGraph;
