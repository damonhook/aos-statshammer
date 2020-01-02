import React from 'react';
import { connect } from 'react-redux';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import BetaTag from 'components/BetaTag';
import LinkItem from './LinkItem';
import { IStore } from 'types/store';

interface PdfDownloadItemProps {
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

const mapStateToProps = (state: IStore) => ({
  numUnits: state.units.length,
});

export default connect(mapStateToProps)(PdfDownloadItem);
