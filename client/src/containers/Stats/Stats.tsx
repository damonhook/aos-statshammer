import React, { useEffect, useState, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { DEBOUNCE_TIMEOUT } from 'appConstants';
import { useMapping } from 'hooks';
import { getResultsMapping, applyUnitNameMapping } from 'utils/mappers';
import { IStore } from 'types/store';
import Results from './Results';

const mapStateToProps = (state: IStore) => ({
  units: state.units,
  stats: state.stats,
});

const connector = connect(mapStateToProps);
interface IStatsProps extends ConnectedProps<typeof connector> {
  className?: string;
}

const Stats = ({ units, stats, className }: IStatsProps) => {
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
  }, [units, setUnitMappingDebounced]);

  useEffect(() => {
    if (results && results.length) {
      const newUnitNames = Object.keys(results[0]).filter(n => n != null && n !== 'save');
      setUnitNames(newUnitNames);
    }
  }, [results]);

  return <Results stats={{ ...stats, payload: results }} unitNames={unitNames} className={className} />;
};

export default connector(Stats);
