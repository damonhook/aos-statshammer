import React from 'react';
import { connect } from 'react-redux';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { Timeline as TimelineIcon } from '@material-ui/icons';
import BetaTag from 'components/BetaTag';
import LinkItem from './LinkItem';
import { IStore } from 'types/store';

interface AdvancedStatsItemProps {
  numUnits: number;
}

const AdvancedStatsItem: React.FC<AdvancedStatsItemProps> = ({ numUnits }) => (
  <LinkItem to="/advanced" disabled={numUnits <= 0}>
    <ListItemIcon>
      <TimelineIcon />
    </ListItemIcon>
    <ListItemText>
      Advanced Stats
      <BetaTag />
    </ListItemText>
  </LinkItem>
);

const mapStateToProps = (state: IStore) => ({
  numUnits: state.units.length,
});

export default connect(mapStateToProps)(AdvancedStatsItem);
