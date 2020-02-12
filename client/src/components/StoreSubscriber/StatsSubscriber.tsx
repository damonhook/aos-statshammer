import { fetchStatsCompare } from 'api';
import { DEBOUNCE_TIMEOUT } from 'appConstants';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IStore } from 'types/store';
import { IUnit } from 'types/unit';
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

const mapStateToProps = (state: IStore) => ({
  units: state.units.map((u: IUnit) => filterNameFromUnit(u)),
  target: state.target,
});

const connector = connect(mapStateToProps, { fetchStatsCompare });
interface IStatsSubscriberProps extends ConnectedProps<typeof connector> {}

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

export default connector(StatsSubscriber);
