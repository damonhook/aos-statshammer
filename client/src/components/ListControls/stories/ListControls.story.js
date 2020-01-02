import React from 'react';
import { storiesOf } from '@storybook/react';
import ListControls from 'components/ListControls';
import { action } from '@storybook/addon-actions';
import {
  Delete, Add, FileCopy,
} from '@material-ui/icons';
import Container from 'utils/Container';

storiesOf('Components/ListControls', module)
  .add('Basic', () => (
    <Container variant="paper">
      <ListControls
        primaryItems={[
          {
            name: 'Add Item',
            onClick: action('add-item-clicked'),
            icon: <Add />,
          },
          {
            name: 'Delete Item',
            onClick: action('delete-item-clicked'),
            icon: <Delete />,
          },
          {
            name: 'Copy Item',
            onClick: action('copy-item-clicked'),
            icon: <FileCopy />,
            disabled: true,
          },
        ]}
        secondaryItems={[
          {
            name: 'Secondary Action 1',
            onClick: action('secondary-item-1-clicked'),
          },
          {
            name: 'Secondary Action 2',
            onClick: action('secondary-item-2-clicked'),
          },
          {
            name: 'Disabled Secondary',
            onClick: action('disabled-secondary-item-clicked'),
            disabled: true,
          },
        ]}
      />
    </Container>
  ));
