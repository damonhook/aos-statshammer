import React from 'react';
import { storiesOf } from '@storybook/react';
import { loremIpsum } from 'utils/lorem';
import Card, { CardHeader, CardBody } from 'components/Card';
import { text } from '@storybook/addon-knobs';
import Container from 'utils/Container';

const lorem = loremIpsum.generateSentences(5);

storiesOf('Components/Card', module)
  .add('Basic', () => (
    <Container>
      <Card>
        <CardBody>{text('Contents', lorem)}</CardBody>
      </Card>
    </Container>
  ))

  .add('With header', () => (
    <Container>
      <Card>
        <CardHeader>{text('Header', 'Header')}</CardHeader>
        <CardBody>{text('Contents', lorem)}</CardBody>
      </Card>
    </Container>
  ));
