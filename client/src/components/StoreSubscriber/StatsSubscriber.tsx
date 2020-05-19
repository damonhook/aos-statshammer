import { fetchStatsCompare } from 'api';
import appConfig from 'appConfig';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { targetSelector } from 'store/selectors/targetSelectors';
import { unitsSelector } from 'store/selectors/unitsSelectors';
import type { IUnit } from 'types/unit';
import { useDebouncedCallback } from 'use-debounce';

/**
 * Filter out the name from a unit as there is not need to refetch the stats
 * @param {object} unit The unit object
 */
const filterNameFromUnit = (unit: IUnit) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, ...rest } = unit;
  return rest;
};

const filteredUnitsSelector = createSelector(unitsSelector, (units) =>
  units.map((u: IUnit) => filterNameFromUnit(u)),
);

/**
 * A component that is subscribed to the redux store and will fetch the stats if the unit
 * state changes
 */
const StatsSubscriber = () => {
  const dispatch = useDispatch();
  const units = useSelector(filteredUnitsSelector, _.isEqual);
  const target = useSelector(targetSelector, _.isEqual);

  const [debouncedUseEffect] = useDebouncedCallback(() => {
    dispatch(fetchStatsCompare());
  }, appConfig.timers.debounce);

  useEffect(() => {
    debouncedUseEffect();
  }, [debouncedUseEffect, units, target, dispatch]);

  return <span style={{ display: 'none' }} />;
};

export default StatsSubscriber;
