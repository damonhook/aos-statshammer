import React from 'react';
import { storiesOf } from '@storybook/react';
import NoItemsCard from 'components/NoItemsCard';
import Container from 'utils/Container';
import { text, boolean } from '@storybook/addon-knobs';

storiesOf('Components/NoItemsCard', module)
  .add('Basic', () => (
    <Container>
      <NoItemsCard
        header={text('Header', 'It\'s lonely here')}
        body={text('Body', 'There are no items here, try adding some')}
        dense={boolean('Dense', false)}
        nested={boolean('Nested', false)}
      />
    </Container>
  ), { knobs: { escapeHTML: false } });
