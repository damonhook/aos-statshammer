import { Github, Reddit, Releases, WarcryStatshammer } from 'components/SocialButtons';
import React from 'react';

const SocialItems = () => (
  <>
    <Github forceVariant="mini" />
    <Reddit forceVariant="mini" />
    <Releases forceVariant="mini" />
    <WarcryStatshammer forceVariant="mini" />
  </>
);

export default SocialItems;
