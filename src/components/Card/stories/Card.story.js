import React from 'react';
import { storiesOf } from '@storybook/react';
import { loremIpsum } from 'utils/lorem';
import Card from 'components/Card';

const lorem = loremIpsum.generateSentences(5);

storiesOf('Components/Card', module)
  .add('Basic', () => (
    <Card>
      <Card.Body>
        {lorem}
      </Card.Body>
    </Card>
  ))

  .add('With header', () => (
    <Card>
      <Card.Header>
        Header
      </Card.Header>
      <Card.Body>
        {lorem}
      </Card.Body>
    </Card>
  ));
