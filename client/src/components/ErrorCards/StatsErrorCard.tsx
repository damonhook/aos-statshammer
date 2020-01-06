import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { fetchStatsCompare } from 'api';
import ErrorCard from './ErrorCard';

const connector = connect(null, { fetchStatsCompare });
interface StatsErrorCard extends ConnectedProps<typeof connector> {
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

export default connector(StatsErrorCard);
