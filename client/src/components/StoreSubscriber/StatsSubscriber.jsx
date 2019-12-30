import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchStatsCompare } from 'api';
import { useDebouncedCallback } from 'use-debounce';
import { DEBOUNCE_TIMEOUT } from 'appConstants';
import _ from 'lodash';

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
const StatsSubscriber = React.memo(({ fetchStatsCompare }) => {
  const [debouncedUseEffect] = useDebouncedCallback(
    () => { fetchStatsCompare(); },
    DEBOUNCE_TIMEOUT,
  );

  useEffect(() => { debouncedUseEffect(); });

  return <span style={{ display: 'none' }} />;
}, (prevProps, nextProps) => _.isEqual(prevProps, nextProps));

StatsSubscriber.propTypes = {
  /** A function used to fetch the stats from the API */
  fetchStatsCompare: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  units: state.units.map((u) => filterNameFromUnit(u)),
  target: state.target,
});

export default connect(mapStateToProps, { fetchStatsCompare })(StatsSubscriber);
