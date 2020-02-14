import { fetchSimulations } from 'api';
import React from 'react';
import { useDispatch } from 'react-redux';

import ErrorCard from './ErrorCard';

interface ISimulationsErrorCardProps {
  className?: string;
}

/**
 * A card representing that there was an error getting the stats
 */
const SimulationsErrorCard = ({ className }: ISimulationsErrorCardProps) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchSimulations());
  };

  return <ErrorCard className={className} retryFunc={handleClick} />;
};

export default SimulationsErrorCard;
