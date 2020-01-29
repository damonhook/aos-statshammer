import React from 'react';
import { Github, Reddit, Releases } from 'components/SocialButtons';

const SocialItems = () => (
  <>
    <Github forceVariant="mini" />
    <Reddit forceVariant="mini" />
    <Releases forceVariant="mini" />
  </>
);

export default SocialItems;
