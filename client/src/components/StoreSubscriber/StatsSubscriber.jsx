import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchStatsCompare } from 'api';
import { bindActionCreators } from 'redux';
import { useDebouncedCallback } from 'use-debounce';
import { DEBOUNCE_TIMEOUT } from 'appConstants';
import { usePrevious } from 'hooks';

/**
 * Filter out the name from a unit as there is not need to refetch the stats
 * @param {object} unit The unit object
 */
const filterNameFromUnit = (unit) => {
  const { name, ...rest } = unit;
  return rest;
};

/**
 * A component that is subscribed to the redux store and will fetch the stats if the unit
 * state changes
 */
const StatsSubscriber = ({ units, fetchStatsCompare }) => {
  const prevState = usePrevious({ units });

  const updateStats = () => {
    let prevUnits = (prevState && prevState.units) ? prevState.units : [];
    prevUnits = prevUnits.map((u) => filterNameFromUnit(u));
    const newUnits = units.map((u) => filterNameFromUnit(u));
    if (JSON.stringify(prevUnits) !== JSON.stringify(newUnits)) {
      fetchStatsCompare();
    }
  };

  const [debouncedUseEffect] = useDebouncedCallback(
    () => { updateStats(); },
    DEBOUNCE_TIMEOUT,
  );

  useEffect(() => { debouncedUseEffect(); }, [units, debouncedUseEffect]);

  return <span style={{ display: 'none' }} />;
};

StatsSubscriber.propTypes = {
  /** The current unit state in the store */
  units: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    uuid: PropTypes.string,
    weapon_profiles: PropTypes.array,
  })).isRequired,
  /** A function used to fetch the stats from the API */
  fetchStatsCompare: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ units: state.units });

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchStatsCompare,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StatsSubscriber);
