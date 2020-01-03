import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import RollInput from 'components/RollInput';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Container from 'utils/Container';
import { Add } from '@material-ui/icons';

storiesOf('Components/RollInput', module).add('Basic', () => {
  const [value] = useState(null);
  const adornment = boolean('Adornment', true) ? <Add /> : null;

  return (
    <Container variant="paper">
      <RollInput
        label={text('Label', 'Label')}
        allowOnes={boolean('AllowOnes', false)}
        value={value}
        onChange={action('value-changed')}
        endAdornment={adornment}
      />
    </Container>
  );
});
