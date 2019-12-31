import React from 'react';
import { storiesOf } from '@storybook/react';
import ConfirmationDialog from 'components/ConfirmationDialog';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

storiesOf('Components/ConfirmationDialog', module)
  .add('Basic', () => (
    <ConfirmationDialog
      open={boolean('Open', true)}
      onConfirm={action('confirmed')}
      onClose={action('closed')}
      description={text('Text', 'Example Text')}
    />
  ));
