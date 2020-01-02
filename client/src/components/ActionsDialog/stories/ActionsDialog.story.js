import React from 'react';
import { storiesOf } from '@storybook/react';
import ActionsDialog from 'components/ActionsDialog';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Container from 'utils/Container';

storiesOf('Components/ActionsDialog', module)
  .add('Basic', () => (
    <Container fullHeight>
      <ActionsDialog
        open={boolean('Open', true)}
        actions={[
          { label: 'Disabled Action', disabled: true, onClick: action('action-click') },
          { label: 'Enabled Action', onClick: action('action-click') },
        ]}
        target={text('Target', 'Target')}
        onClose={action('dialog-closed')}
      />
    </Container>
  ));
