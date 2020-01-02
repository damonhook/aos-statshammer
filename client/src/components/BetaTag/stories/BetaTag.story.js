import React from 'react';
import { storiesOf } from '@storybook/react';
import BetaTag from 'components/BetaTag';
import { select, text } from '@storybook/addon-knobs';
import { Typography } from '@material-ui/core';
import Container from 'utils/Container';

storiesOf('Components/BetaTag', module)
  .add('Basic', () => (
    <Container variant="paper">
      <BetaTag
        variant={select('Variant', ['main', 'light', 'dark'], 'main')}
      />
    </Container>
  ))

  .add('With Text', () => (
    <Container variant="paper">
      <Typography color="textPrimary">
        {text('Text', 'Example Text')}
        <BetaTag
          variant={select('Variant', ['main', 'light', 'dark'], 'main')}
        />
      </Typography>
    </Container>
  ));
