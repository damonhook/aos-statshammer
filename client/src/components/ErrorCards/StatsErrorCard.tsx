import React from 'react';
import { connect } from 'react-redux';

import { fetchStatsCompare } from 'api';
import { bindActionCreators } from 'redux';
import ErrorCard from './ErrorCard';

interface StatsErrorCard {
  fetchStatsCompare: any;
  className?: string;
}

/**
 * A card representing that there was an error getting the stats
 */
const StatsErrorCard = ({ fetchStatsCompare, className }) => {
  const handleClick = () => {
    fetchStatsCompare();
  };

  return <ErrorCard className={className} retryFunc={handleClick} />;
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default connect(null, { fetchStatsCompare }, mergeProps)(StatsErrorCard);
