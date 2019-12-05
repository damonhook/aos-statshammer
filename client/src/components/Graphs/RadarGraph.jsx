import React from 'react';
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

export default RadarGraph;
