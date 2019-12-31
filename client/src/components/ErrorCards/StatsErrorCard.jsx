import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchStatsCompare } from 'api';
import { bindActionCreators } from 'redux';
import ErrorCard from './ErrorCard';


/**
 * A card representing that there was an error getting the stats
 */
const StatsErrorCard = ({ fetchStatsCompare, className }) => {
  const handleClick = () => {
    fetchStatsCompare();
  };

  return (
    <ErrorCard className={className} retryFunc={handleClick} />
  );
};

StatsErrorCard.defaultProps = {
  className: null,
};

StatsErrorCard.propTypes = {
  /** A function used to fetch the stats */
  fetchStatsCompare: PropTypes.func.isRequired,
  /** CSS classname to give the component */
  className: PropTypes.string,
};


const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchStatsCompare,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps, ...dispatchProps, ...ownProps,
});

export default connect(null, mapDispatchToProps, mergeProps)(StatsErrorCard);
