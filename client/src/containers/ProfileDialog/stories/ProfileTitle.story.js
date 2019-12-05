import React from 'react';
import { storiesOf } from '@storybook/react';
import ProfileTitle from 'containers/ProfileDialog/ProfileTitle';
import { boolean } from '@storybook/addon-knobs';

storiesOf('Containers/ProfileDialog', module)
  .add('ProfileTitle', () => {
    const fullScreen = boolean('Full Screen Dialog', false);
    return (
      <ProfileTitle
        header="Edit Profile"
        fullScreen={fullScreen}
      />
    );
  });
