import React from 'react';
import { storiesOf } from '@storybook/react';
import { loremIpsum } from 'utils/lorem';
import Card from 'components/Card';
import { text } from '@storybook/addon-knobs';
import Container from 'utils/Container';

const lorem = loremIpsum.generateSentences(5);

storiesOf('Components/Card', module)
  .add('Basic', () => (
    <Container>
      <Card>
        <Card.Body>
          {text('Contents', lorem)}
        </Card.Body>
      </Card>
    </Container>
  ))

  .add('With header', () => (
    <Container>
      <Card>
        <Card.Header>
          {text('Header', 'Header')}
        </Card.Header>
        <Card.Body>
          {text('Contents', lorem)}
        </Card.Body>
      </Card>
    </Container>
  ));
