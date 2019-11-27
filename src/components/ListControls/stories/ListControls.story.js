import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs/react';
import ListControls from 'components/ListControls';

storiesOf('Components/ListControls', module)
  .add('Basic', () => (
    <ListControls
      onEdit={boolean('Edit Enabled', true) ? () => {} : null}
      onCopy={boolean('Copy Enabled', true) ? () => {} : null}
      onDelete={boolean('Delete Enabled', true) ? () => {} : null}
    />
  ));
