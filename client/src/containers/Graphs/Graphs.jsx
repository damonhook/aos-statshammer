import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { BarGraph, LineGraph, RadarGraph } from 'components/Graphs';
import { useMediaQuery } from '@material-ui/core';
import GraphList from './GraphList';
import GraphTabbed from './GraphTabbed';

/** A mapping of Graph Name -> Graph Component, in render order */
const graphMap = new Map([
  ['Bar Graph', BarGraph],
  ['Line Graph', LineGraph],
  ['Radar Graph', RadarGraph],
]);

const Graphs = ({ stats, unitNames, desktopGraphList }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return mobile || desktopGraphList
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

Graphs.defaultProps = {
  desktopGraphList: false,
};

Graphs.propTypes = {
  /** The current state of the stats reducer. */
  stats: PropTypes.shape({
    pending: PropTypes.bool,
    payload: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.string,
  }).isRequired,
  /** An array containing the unit names */
  unitNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Whether the graphs should be rendered as a list on desktop */
  desktopGraphList: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  desktopGraphList: state.config.desktopGraphList,
});

export default connect(mapStateToProps)(Graphs);
