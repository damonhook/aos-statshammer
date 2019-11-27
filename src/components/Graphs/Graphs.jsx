import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabbed from 'components/Tabbed';
import BarGraph from './BarGraph';
import LineGraph from './LineGraph';
import RadarGraph from './RadarGraph';

const useStyles = makeStyles({
  graphContainer: {},
  content: {
    height: '300px',
    paddingTop: '2em',
    overflow: 'hidden',
    flexBasis: '50%',
  },
});

const graphColors = [
  '#8884d8',
  '#82ca9d',
  '#ff7300',
  '#413ea0',
];

const Graphs = ({ results, unitNames }) => {
  const classes = useStyles();

  if (!results || !unitNames) {
    return null;
  }

  const graphList = [
    LineGraph, BarGraph, RadarGraph,
  ];

  return (
    <Tabbed
      className={`${classes.graphContainer}`}
      tabNames={['Line Graph', 'Bar Graph', 'Radar Graph']}
      tabContent={graphList.map((Graph) => (
        <Graph
          className={classes.content}
          results={results}
          unitNames={unitNames}
          colors={graphColors}
        />
      ))}
    />
  );
};


export default Graphs;
