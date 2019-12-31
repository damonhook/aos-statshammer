import React from 'react';
import { storiesOf } from '@storybook/react';
import BetaTag from 'components/BetaTag';
import { select, text } from '@storybook/addon-knobs';
import { Typography } from '@material-ui/core';

storiesOf('Components/BetaTag', module)
  .add('Basic', () => (
    <BetaTag
      variant={select('Variant', ['main', 'light', 'dark'], 'main')}
    />
  ))

  .add('With Text', () => (
    <Typography>
      {text('Text', 'Example Text')}
      <BetaTag
        variant={select('Variant', ['main', 'light', 'dark'], 'main')}
      />
    </Typography>
  ));
