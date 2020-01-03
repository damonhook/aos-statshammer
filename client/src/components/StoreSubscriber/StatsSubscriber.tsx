import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchStatsCompare } from 'api';
import { useDebouncedCallback } from 'use-debounce';
import { DEBOUNCE_TIMEOUT } from 'appConstants';
import _ from 'lodash';
import { IUnit, IStore } from 'types/store';

/**
 * Filter out the name from a unit as there is not need to refetch the stats
 * @param {object} unit The unit object
 */
const filterNameFromUnit = (unit: IUnit) => {
  const { name, ...rest } = unit;
  return rest;
};

interface IStatsSubscriberProps {
  fetchStatsCompare: () => void;
}

/**
 * A component that is subscribed to the redux store and will fetch the stats if the unit
 * state changes
 */
const StatsSubscriber: React.FC<IStatsSubscriberProps> = React.memo(
  ({ fetchStatsCompare }) => {
    const [debouncedUseEffect] = useDebouncedCallback(() => {
      fetchStatsCompare();
    }, DEBOUNCE_TIMEOUT);

    useEffect(() => {
      debouncedUseEffect();
    });

    return <span style={{ display: 'none' }} />;
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

const mapStateToProps = (state: IStore) => ({
  units: state.units.map((u: IUnit) => filterNameFromUnit(u)),
  target: state.target,
});

export default connect(mapStateToProps, { fetchStatsCompare })(StatsSubscriber);
