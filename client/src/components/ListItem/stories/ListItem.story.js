import React from 'react';import { storiesOf } from '@storybook/react';
import ListItem from 'components/ListItem';
import { text, boolean } from '@storybook/addon-knobs';
import { loremIpsum } from 'utils/lorem';
import { action } from '@storybook/addon-actions';
import {
  Delete, Add, FileCopy,
} from '@material-ui/icons';
import Container from 'utils/Container';

const lorem = loremIpsum.generateSentences(5);

storiesOf('Components/ListItem', module)
  .add('Basic', () => (
    <Container>
      <ListItem
        header={text('Header', 'Header')}
        loading={boolean('Loading', false)}
        loaderDelay={100}
        collapsible={boolean('Collapsible', false)}
      >
        {text('Content', lorem)}
      </ListItem>
    </Container>
  ))
  .add('Controls', () => (
    <Container>
      <ListItem
        header={text('Header', 'Header')}
        loading={boolean('Loading', false)}
        loaderDelay={100}
        collapsible={boolean('Collapsible', false)}
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
      >
        {text('Content', lorem)}
      </ListItem>
    </Container>
  ));
