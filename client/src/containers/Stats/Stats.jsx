import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { DEBOUNCE_TIMEOUT } from 'appConstants';
import { useMapping } from 'hooks';
import { getResultsMapping, applyUnitNameMapping } from 'utils/mappers';
import Results from './Results';

const Stats = ({ units, stats, className }) => {
  const [unitNames, setUnitNames] = useState(units.map(({ name }) => name));
  const [unitMapping, setUnitMapping] = useState({});

  const mapper = useCallback(getResultsMapping(unitMapping), [unitMapping]);
  const results = useMapping(stats.payload, mapper, stats.pending);

  const [setUnitMappingDebounced] = useDebouncedCallback(
    (newValue) => { setUnitMapping(newValue); },
    DEBOUNCE_TIMEOUT,
  );

  useEffect(() => {
    const newMapping = applyUnitNameMapping(units);
    setUnitMappingDebounced(newMapping);
  }, [units, setUnitMappingDebounced]);

  useEffect(() => {
    if (results && results.length) {
      const newUnitNames = Object.keys(results[0]).filter((n) => n != null && n !== 'save');
      setUnitNames(newUnitNames);
    }
  }, [results]);

  return (
    <Results stats={{ ...stats, payload: results }} unitNames={unitNames} className={className} />
  );
};

const mapStateToProps = (state) => ({
  units: state.units,
  stats: state.stats,
});

export default connect(mapStateToProps)(Stats);
