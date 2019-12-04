import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchStatsCompare } from 'api';
import { bindActionCreators } from 'redux';
import { useDebouncedCallback } from 'use-debounce';
import Results from './Results';

const Stats = ({ units, stats, fetchStatsCompare }) => {
  const [unitNames, setUnitNames] = useState(units.map(({ name }) => name));
  const [debouncedCallback] = useDebouncedCallback(
    (units) => { fetchStatsCompare(units); },
    200,
  );

  const getUnitNamesFromStats = () => Object.keys(stats.payload[0]).filter((n) => n != null && n !== 'save');

  useEffect(() => debouncedCallback(units), [units]);
  useEffect(() => {
    if (stats.payload && stats.payload.length) setUnitNames(getUnitNamesFromStats());
  }, [stats]);

  return (
    <Results stats={stats} unitNames={unitNames} />
  );
};

const mapStateToProps = (state) => (state);

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchStatsCompare,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
