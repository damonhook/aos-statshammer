import React from 'react';
import { GitHub as GitHubIcon } from '@material-ui/icons';
import { ISocialButtonProps } from './props';
import SocialItem from './SocialItem';

const Github = ({ className, forceVariant }: ISocialButtonProps) => {
  return (
    <SocialItem
      className={className}
      href="https://github.com/damonhook/aos-statshammer"
      text="Github"
      icon={<GitHubIcon />}
      forceVariant={forceVariant}
    />
  );
};

export default Github;
