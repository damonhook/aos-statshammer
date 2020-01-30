import React from 'react';
import { Reddit as RedditIcon } from '@material-ui/icons';
import { ISocialButtonProps } from './props';
import SocialItem from './SocialItem';

const Reddit = ({ className, forceVariant }: ISocialButtonProps) => {
  return (
    <SocialItem
      className={className}
      href="https://www.reddit.com/r/AoSStatshammer"
      text="Reddit"
      icon={<RedditIcon />}
      forceVariant={forceVariant}
    />
  );
};

export default Reddit;
