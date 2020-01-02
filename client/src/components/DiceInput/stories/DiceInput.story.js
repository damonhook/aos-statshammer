import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import DiceInput from 'components/DiceInput';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Container from 'utils/Container';

storiesOf('Components/DiceInput', module)
  .add('Basic', () => {
    const [value] = useState(null);
    return (
      <Container variant="paper">
        <DiceInput
          label={text('Label', 'Label')}
          required={boolean('Required', false)}
          value={value}
          onChange={action('value-changed')}
        />
      </Container>
    );
  });
