import React from 'react';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { BarGraph, LineGraph, RadarGraph } from 'components/Graphs';
import { useMediaQuery } from '@material-ui/core';
import GraphList from './GraphList';
import GraphTabbed from './GraphTabbed';
import { IStatsStore, IStore } from 'types/store';

/** A mapping of Graph Name -> Graph Component, in render order */
const graphMap: Map<string, any> = new Map<string, any>([
  ['Bar Graph', BarGraph],
  ['Line Graph', LineGraph],
  ['Radar Graph', RadarGraph],
]);

interface GraphsProps {
  stats: IStatsStore;
  unitNames: string[];
  desktopGraphList: boolean;
}

const Graphs: React.FC<GraphsProps> = ({ stats, unitNames, desktopGraphList }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return mobile || desktopGraphList ? (
    <GraphList stats={stats} unitNames={unitNames} graphMap={graphMap} />
  ) : (
    <GraphTabbed stats={stats} unitNames={unitNames} graphMap={graphMap} />
  );
};

Graphs.defaultProps = {
  desktopGraphList: false,
};

const mapStateToProps = (state: IStore) => ({
  desktopGraphList: state.config.desktopGraphList,
});

export default connect(mapStateToProps)(Graphs);
