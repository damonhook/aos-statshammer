import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { DEBOUNCE_TIMEOUT } from 'appConstants';
import Results from './Results';

const applyMapping = (mapping, results) => (
  results.map((result) => Object.keys(result).reduce((acc, key) => {
    if (key == null || key === 'save') return acc;
    const name = mapping[key];
    if (name) acc[name] = result[key];
    return acc;
  }, { save: result.save }))
);

const Stats = ({ units, stats }) => {
  const [unitNames, setUnitNames] = useState(units.map(({ name }) => name));
  const [unitMapping, setUnitMapping] = useState({});
  const [results, setResults] = useState(null);

  const [setUnitMappingDebounced] = useDebouncedCallback(
    (newValue) => { setUnitMapping(newValue); },
    DEBOUNCE_TIMEOUT,
  );

  useEffect(() => {
    const newMapping = units.reduce((acc, { uuid, name }) => { acc[uuid] = name; return acc; }, {});
    setUnitMappingDebounced(newMapping);
  }, [units]);

  useEffect(() => {
    if (stats && stats.payload) {
      const newResults = applyMapping(unitMapping, stats.payload);
      const newUnitNames = Object.keys(newResults[0]).filter((n) => n != null && n !== 'save');
      setResults(newResults);
      setUnitNames(newUnitNames);
    }
  }, [unitMapping, stats]);

  return (
    <Results stats={{ ...stats, payload: results }} unitNames={unitNames} />
  );
};

const mapStateToProps = (state) => ({
  units: state.units,
  stats: state.stats,
});

export default connect(mapStateToProps)(Stats);
