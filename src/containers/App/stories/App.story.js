import React from 'react';
import { storiesOf } from '@storybook/react';
import App from 'containers/App';
import { withProvider } from './store';

storiesOf('Containers/App', module)
  .addDecorator(withProvider)
  .add('Basic', () => (
    <App />
  ));
