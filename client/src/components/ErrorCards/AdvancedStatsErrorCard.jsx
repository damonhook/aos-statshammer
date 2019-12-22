import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSimulations } from 'api';
import { bindActionCreators } from 'redux';
import ErrorCard from './ErrorCard';


/**
 * A card representing that there was an error getting the stats
 */
const AdvancedStatsErrorCard = ({ fetchSimulations, className }) => {
  const handleClick = () => {
    fetchSimulations();
  };

  return (
    <ErrorCard className={className} retryFunc={handleClick} />
  );
};

AdvancedStatsErrorCard.defaultProps = {
  className: null,
};

AdvancedStatsErrorCard.propTypes = {
  /** A function used to fetch the stats */
  fetchSimulations: PropTypes.func.isRequired,
  /** CSS classname to give the component */
  className: PropTypes.string,
};


const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchSimulations,
}, dispatch);

export default connect(null, mapDispatchToProps)(AdvancedStatsErrorCard);
