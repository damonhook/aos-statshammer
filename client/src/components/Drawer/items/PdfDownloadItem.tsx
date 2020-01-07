import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import BetaTag from 'components/BetaTag';
import { IStore } from 'types/store';
import LinkItem from './LinkItem';

const mapStateToProps = (state: IStore) => ({
  numUnits: state.units.length,
});

const connector = connect(mapStateToProps);
interface PdfDownloadItemProps extends ConnectedProps<typeof connector> {
  numUnits: number;
}

const PdfDownloadItem: React.FC<PdfDownloadItemProps> = ({ numUnits }) => (
  <LinkItem to="/pdf" disabled={numUnits <= 0}>
    <ListItemIcon>
      <GetApp />
    </ListItemIcon>
    <ListItemText>
      Download PDF
      <BetaTag />
    </ListItemText>
  </LinkItem>
);

export default connector(PdfDownloadItem);
