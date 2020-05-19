import { WarcryStatshammerIcon } from 'components/Icons';
import React from 'react';

import type { ISocialButtonProps } from './props';
import SocialItem from './SocialItem';

const Github = ({ className, forceVariant }: ISocialButtonProps) => {
  return (
    <SocialItem
      className={className}
      href="https://warcry-statshammer.herokuapp.com/"
      text="Warcry Stats"
      icon={<WarcryStatshammerIcon />}
      forceVariant={forceVariant}
    />
  );
};

export default Github;
