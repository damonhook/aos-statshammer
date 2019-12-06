import React from 'react';
import { storiesOf } from '@storybook/react';
import ListItem from 'components/ListItem';
import { loremIpsum } from 'utils/lorem';
import { boolean } from '@storybook/addon-knobs';

const lorem = loremIpsum.generateSentences(5);

storiesOf('Components/ListItem', module)
  .add('Basic', () => (
    <ListItem header="Header">
      <div>{lorem}</div>
    </ListItem>
  ))

  .add('Collapsible', () => (
    <ListItem header="Header" collapsible>
      <div>{lorem}</div>
    </ListItem>
  ))

  .add('With Controls', () => {
    const collapsible = boolean('Collapsible', true);
    const editEnabled = boolean('Edit Enabled', true);
    const deleteEnabled = boolean('Delete Enabled', true);
    const copyEnabled = boolean('Copy Enabled', true);
    const swipeEnabled = boolean('Swipe Enabled', true);

    return (
      <ListItem
        header="Header"
        collapsible={collapsible}
        onEdit={editEnabled ? () => {} : null}
        onDelete={deleteEnabled ? () => {} : null}
        onCopy={copyEnabled ? () => {} : null}
        onSwipe={swipeEnabled ? () => {}: null}
      >
        <div>{lorem}</div>
      </ListItem>
    );
  });
