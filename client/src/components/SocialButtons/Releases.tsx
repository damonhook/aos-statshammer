import { LocalOffer as ReleasesIcon } from '@material-ui/icons';
import React from 'react';

import type { ISocialButtonProps } from './props';
import SocialItem from './SocialItem';

const Releases = ({ className, forceVariant }: ISocialButtonProps) => {
  return (
    <SocialItem
      className={className}
      href="https://github.com/damonhook/aos-statshammer/releases"
      text="Releases"
      icon={<ReleasesIcon />}
      forceVariant={forceVariant}
    />
  );
};

export default Releases;
