import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { fetchStatsCompare } from 'api';
import { bindActionCreators } from 'redux';
import { useDebouncedCallback } from 'use-debounce';
import { DEBOUNCE_TIMEOUT } from 'appConstants';

function usePrevious(state) {
  const ref = useRef();
  useEffect(() => {
    ref.current = state;
  });
  return ref.current;
}

const filterNameFromUnit = (unit) => {
  const { name, ...rest } = unit;
  return rest;
};

const StoreSubscriber = ({ units, fetchStatsCompare }) => {
  const prevState = usePrevious({ units });

  const updateStats = () => {
    let prevUnits = (prevState && prevState.units) ? prevState.units : [];
    prevUnits = prevUnits.map((u) => filterNameFromUnit(u));
    const newUnits = units.map((u) => filterNameFromUnit(u));
    if (JSON.stringify(prevUnits) !== JSON.stringify(newUnits)) {
      fetchStatsCompare(units);
    }
  };

  const [debouncedUseEffect] = useDebouncedCallback(
    () => { updateStats(); },
    DEBOUNCE_TIMEOUT,
  );

  useEffect(() => { debouncedUseEffect(); }, [units, debouncedUseEffect]);

  return <span style={{ display: 'none' }} />;
};

const mapStateToProps = (state) => ({ units: state.units });

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchStatsCompare,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StoreSubscriber);
