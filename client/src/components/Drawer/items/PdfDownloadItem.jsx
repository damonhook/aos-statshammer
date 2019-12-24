import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import BetaTag from 'components/BetaTag';
import LinkItem from './LinkItem';


const PdfDownloadItem = ({ numUnits }) => (
  <LinkItem to="/pdf" disabled={numUnits <= 0}>
    <ListItemIcon><GetApp /></ListItemIcon>
    <ListItemText>
      Download PDF
      <BetaTag />
    </ListItemText>
  </LinkItem>
);

PdfDownloadItem.propTypes = {
  /** The current number of units. Used to disable the button */
  numUnits: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  numUnits: state.units.length,
});

export default connect(mapStateToProps)(PdfDownloadItem);
