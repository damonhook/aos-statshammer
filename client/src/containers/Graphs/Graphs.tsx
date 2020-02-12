import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { BarGraph, LineGraph, RadarGraph } from 'components/Graphs';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IStatsStore, IStore } from 'types/store';

import GraphList from './GraphList';
import GraphTabbed from './GraphTabbed';

/** A mapping of Graph Name -> Graph Component, in render order */
const graphMap: Map<string, any> = new Map<string, any>([
  ['Bar Graph', BarGraph],
  ['Line Graph', LineGraph],
  ['Radar Graph', RadarGraph],
]);

const mapStateToProps = (state: IStore) => ({
  desktopGraphList: state.config.desktopGraphList,
});

const connector = connect(mapStateToProps);
interface GraphsProps extends ConnectedProps<typeof connector> {
  stats: IStatsStore;
  unitNames: string[];
}

const Graphs: React.FC<GraphsProps> = ({ stats, unitNames, desktopGraphList = false }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return mobile || desktopGraphList ? (
    <GraphList stats={stats} unitNames={unitNames} graphMap={graphMap} />
  ) : (
    <GraphTabbed stats={stats} unitNames={unitNames} graphMap={graphMap} />
  );
};

export default connector(Graphs);
