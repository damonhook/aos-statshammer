import { fetchSimulations } from 'api';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import ErrorCard from './ErrorCard';

const connector = connect(null, { fetchSimulations });
interface AdvancedStatsErrorCardProps extends ConnectedProps<typeof connector> {
  className?: string;
}

/**
 * A card representing that there was an error getting the stats
 */
const AdvancedStatsErrorCard: React.FC<AdvancedStatsErrorCardProps> = ({ fetchSimulations, className }) => {
  const handleClick = () => {
    fetchSimulations();
  };

  return <ErrorCard className={className} retryFunc={handleClick} />;
};

export default connector(AdvancedStatsErrorCard);
