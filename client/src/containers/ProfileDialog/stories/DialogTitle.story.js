import React from 'react';
import { storiesOf } from '@storybook/react';
import DialogTitle from 'containers/ProfileDialog/DialogTitle';
import { boolean } from '@storybook/addon-knobs';

storiesOf('Containers/ProfileDialog', module)
  .add('DialogTitle', () => {
    const fullScreen = boolean('Full Screen Dialog', false);
    return (
      <DialogTitle
        header="Edit Profile"
        fullScreen={fullScreen}
      />
    );
  });
