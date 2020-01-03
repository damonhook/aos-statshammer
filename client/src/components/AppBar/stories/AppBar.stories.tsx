import React from 'react';
import { storiesOf } from '@storybook/react';
import AppBar from 'components/AppBar';
import { text, select } from '@storybook/addon-knobs';
import ScrollContainer from 'utils/ScrollContainer';
import Container from 'utils/Container';

storiesOf('Components/AppBar', module)
  .add('Basic', () => (
    <Container fullHeight>
      <AppBar title={text('Title', 'Title')} variant={select('Variant', ['home', 'advanced'], 'home')} />
    </Container>
  ))

  .add('With Scroll', () => (
    <ScrollContainer>
      <AppBar title={text('Title', 'Title')} variant={select('Variant', ['home', 'advanced'], 'home')} />
    </ScrollContainer>
  ));
