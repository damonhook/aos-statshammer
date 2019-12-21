import React from 'react';
import { connect } from 'react-redux';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { Timeline as TimelineIcon } from '@material-ui/icons';
import LinkItem from './LinkItem';

const AdvancedStatsItem = ({ numUnits }) => (
  <LinkItem to="/advanced" disabled={numUnits <= 0}>
    <ListItemIcon><TimelineIcon /></ListItemIcon>
    <ListItemText primary="Advanced Stats" />
  </LinkItem>
);

const mapStateToProps = (state) => ({
  numUnits: state.units.length,
});

export default connect(mapStateToProps)(AdvancedStatsItem);
