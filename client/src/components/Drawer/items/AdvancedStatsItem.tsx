import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { Timeline as TimelineIcon } from '@material-ui/icons';
import { IStore } from 'types/store';
import { ROUTES } from 'utils/urls';
import LinkItem from './LinkItem';

const mapStateToProps = (state: IStore) => ({
  numUnits: state.units.length,
});

const connector = connect(mapStateToProps);
interface AdvancedStatsItemProps extends ConnectedProps<typeof connector> {
  numUnits: number;
}

const AdvancedStatsItem: React.FC<AdvancedStatsItemProps> = ({ numUnits }) => (
  <LinkItem to={ROUTES.SIMULATIONS} disabled={numUnits <= 0}>
    <ListItemIcon>
      <TimelineIcon />
    </ListItemIcon>
    <ListItemText>Simulations</ListItemText>
  </LinkItem>
);

export default connector(AdvancedStatsItem);
