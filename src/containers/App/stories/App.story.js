import React from 'react';
import { storiesOf } from '@storybook/react';
import App from 'containers/App';
import { withProvider } from 'utils/exampleStore';
import DesktopAppContent from 'containers/App/DesktopAppContent';
import MobileAppContent from 'containers/App/MobileAppContent';

storiesOf('Containers/App', module)
  .addDecorator(withProvider)
  .add('Basic', () => (
    <App />
  ))

  .add('Desktop Content', () => (
    <DesktopAppContent />
  ))

  .add('Mobile Content', () => (
    <MobileAppContent />
  ));
