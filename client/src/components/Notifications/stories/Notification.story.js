import React from 'react';
import { storiesOf } from '@storybook/react';
import Notification from 'components/Notifications/Notification';
import { text, select } from '@storybook/addon-knobs';
import { withProvider } from 'utils/exampleStore';

storiesOf('Components/Notifications', module)
  .addDecorator(withProvider)
  .add('Notification', () => {
    const variant = select('Variant', ['info', 'success', 'warning', 'error'], 'info');
    return (
      <div style={{ marginTop: '2em' }}>
        <Notification
          notificationId="1"
          message={text('Message', 'Message')}
          variant={variant}
          timeout={null}
        />
      </div>
    );
  });
