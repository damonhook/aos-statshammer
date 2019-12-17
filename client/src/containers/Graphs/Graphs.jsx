import React from 'react';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { BarGraph, LineGraph, RadarGraph } from 'components/Graphs';
import { useMediaQuery } from '@material-ui/core';
import GraphList from './GraphList';
import GraphTabbed from './GraphTabbed';


const graphMap = new Map([
  ['Bar Graph', BarGraph],
  ['Line Graph', LineGraph],
  ['Radar Graph', RadarGraph],
]);

const Graphs = ({ stats, unitNames, config }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return mobile || config.desktopGraphList
    ? (
      <GraphList
        stats={stats}
        unitNames={unitNames}
        graphMap={graphMap}
      />
    )
    : (
      <GraphTabbed
        stats={stats}
        unitNames={unitNames}
        graphMap={graphMap}
      />
    );
};

const mapStateToProps = (state) => ({
  config: state.config,
});

export default connect(mapStateToProps)(Graphs);
