import React from 'react';
import StatsSubscriber from './StatsSubscriber';
import ModifiersSubscriber from './ModifiersSubscriber';

const StoreSubscriber = () => (
  <div style={{ display: 'none !important' }}>
    <StatsSubscriber />
    <ModifiersSubscriber />
  </div>
);

export default StoreSubscriber;
