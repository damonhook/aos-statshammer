import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { BarGraph, LineGraph, RadarGraph } from 'components/Graphs';
import React from 'react';
import { useSelector } from 'react-redux';
import { desktopGraphListSelector } from 'store/selectors';
import { IStatsStore } from 'types/store';

import GraphList from './GraphList';
import GraphTabbed from './GraphTabbed';

/** A mapping of Graph Name -> Graph Component, in render order */
const graphMap: Map<string, any> = new Map<string, any>([
  ['Bar Graph', BarGraph],
  ['Line Graph', LineGraph],
  ['Radar Graph', RadarGraph],
]);

interface IGraphsProps {
  stats: IStatsStore;
  unitNames: string[];
}

const Graphs = ({ stats, unitNames }: IGraphsProps) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const desktopGraphList = useSelector(desktopGraphListSelector);

  return mobile || desktopGraphList ? (
    <GraphList stats={stats} unitNames={unitNames} graphMap={graphMap} />
  ) : (
    <GraphTabbed stats={stats} unitNames={unitNames} graphMap={graphMap} />
  );
};

export default Graphs;
