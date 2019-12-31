import React from 'react';
import { storiesOf } from '@storybook/react';
import { loremIpsum } from 'utils/lorem';
import Card from 'components/Card';
import { text } from '@storybook/addon-knobs';

const lorem = loremIpsum.generateSentences(5);

storiesOf('Components/Card', module)
  .add('Basic', () => (
    <Card>
      <Card.Body>
        {text('Contents', lorem)}
      </Card.Body>
    </Card>
  ))

  .add('With header', () => (
    <Card>
      <Card.Header>
        {text('Header', 'Header')}
      </Card.Header>
      <Card.Body>
        {text('Contents', lorem)}
      </Card.Body>
    </Card>
  ));
