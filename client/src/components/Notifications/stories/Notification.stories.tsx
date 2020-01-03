import nanoid from 'nanoid';
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import Notification from 'components/Notifications/Notification';
import { text, select } from '@storybook/addon-knobs';
import Container from 'utils/Container';
import { action } from '@storybook/addon-actions';
import { Button, Fade } from '@material-ui/core';

storiesOf('Components/Notifications', module).add('Basic', () => {
  const [forceRefresh, setForceRefresh] = useState(nanoid());
  const [active, setActive] = useState(true);

  const handleClick = () => {
    setActive(true);
    setForceRefresh(nanoid());
  };

  const handleDismiss = id => {
    setActive(false);
    action('notification-dismissed')(id);
  };

  return (
    <Container disablePadding>
      <Fade in={!active}>
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
          style={{ margin: '2em 5em' }}
          size="large"
        >
          Refresh Notification
        </Button>
      </Fade>
      <div style={{ flex: 1 }} />
      <Notification
        notificationId={forceRefresh}
        message={text('Message', 'Message')}
        variant={select('Variant', ['info', 'warning', 'error', 'success'], 'info')}
        dismissNotification={handleDismiss}
        timeout={null}
      />
    </Container>
  );
});
