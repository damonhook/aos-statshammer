import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSimulations } from 'api';
import { bindActionCreators } from 'redux';
import ErrorCard from './ErrorCard';

interface AdvancedStatsErrorCardProps {
  fetchSimulations: any;
  className?: string;
}

/**
 * A card representing that there was an error getting the stats
 */
const AdvancedStatsErrorCard: React.FC<AdvancedStatsErrorCardProps> = ({
  fetchSimulations,
  className,
}) => {
  const handleClick = () => {
    fetchSimulations();
  };

  return <ErrorCard className={className} retryFunc={handleClick} />;
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default connect(null, { fetchSimulations }, mergeProps)(AdvancedStatsErrorCard);
