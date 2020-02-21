import { fetchStatsCompare } from 'api';
import React from 'react';
import { useDispatch } from 'react-redux';

import ErrorCard from './ErrorCard';

interface IStatsErrorCardProps {
  className?: string;
}

/**
 * A card representing that there was an error getting the stats
 */
const StatsErrorCard = ({ className }: IStatsErrorCardProps) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchStatsCompare());
  };

  return <ErrorCard className={className} retryFunc={handleClick} />;
};

export default StatsErrorCard;
