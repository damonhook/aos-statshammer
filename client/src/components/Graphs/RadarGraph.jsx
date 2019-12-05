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
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import GraphContainer from './GraphContainer';


const useStyles = makeStyles({
  graph: {},
});

const RadarGraph = ({
  results, unitNames, className, colors,
}) => {
  const classes = useStyles();

  return (
    <GraphContainer className={clsx(classes.graph, className)}>
      <RadarChart data={results} outerRadius={120} cy="35%">
        <PolarGrid strokeDasharray="3 3" />
        <PolarAngleAxis dataKey="save" />
        <PolarRadiusAxis />
        <Tooltip />
        <Legend />
        {unitNames.map((name, index) => (
          <Radar
            type="monotone"
            dataKey={name}
            stroke={colors[index]}
            fill={colors[index]}
            fillOpacity={0.1}
            key={name}
          />
        ))}
      </RadarChart>

    </GraphContainer>
  );
};

RadarGraph.defaultProps = {
  className: null,
};

RadarGraph.propTypes = {
  /** The array of results to display in the graph */
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** An array containing the Unit names, used for the data key */
  unitNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** CSS classname to give the component */
  className: PropTypes.string,
  /** An array of hex colors to use when generating the graph radars */
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default RadarGraph;
