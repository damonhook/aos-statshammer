import { DEBOUNCE_TIMEOUT } from 'appConstants';
import { useMapping } from 'hooks';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { unitsSelector } from 'store/selectors';
import { IStore } from 'types/store';
import { useDebouncedCallback } from 'use-debounce';
import { applyUnitNameMapping, getResultsMapping } from 'utils/mappers';

import Results from './Results';

interface IStatsProps {
  className?: string;
}

const Stats = ({ className }: IStatsProps) => {
  const units = useSelector(unitsSelector, _.isEqual);
  const stats = useSelector((state: IStore) => state.stats, _.isEqual);
  const [unitNames, setUnitNames] = useState(units.map(({ name }) => name));
  const [unitMapping, setUnitMapping] = useState({});

  const mapper = useCallback(getResultsMapping(unitMapping), [unitMapping]);
  const results = useMapping(stats.payload, mapper, stats.pending);

  const [setUnitMappingDebounced] = useDebouncedCallback(newValue => {
    setUnitMapping(newValue);
  }, DEBOUNCE_TIMEOUT);

  useEffect(() => {
    const newMapping = applyUnitNameMapping(units);
    setUnitMappingDebounced(newMapping);
  }, [setUnitMappingDebounced, units]);

  useEffect(() => {
    if (results && results.length) {
      const newUnitNames = Object.keys(results[0]).filter(n => n != null && n !== 'save');
      setUnitNames(newUnitNames);
    }
  }, [results]);

  return <Results stats={{ ...stats, payload: results }} unitNames={unitNames} className={className} />;
};

export default Stats;
