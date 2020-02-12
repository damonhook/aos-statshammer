import React from 'react';

import ModifiersSubscriber from './ModifiersSubscriber';
import StatsSubscriber from './StatsSubscriber';
import TargetModifiersSubscriber from './TargetModifiersSubscriber';

const StoreSubscriber: React.FC = () => (
  <div style={{ display: 'none !important' }}>
    <StatsSubscriber />
    <ModifiersSubscriber />
    <TargetModifiersSubscriber />
  </div>
);

export default StoreSubscriber;
