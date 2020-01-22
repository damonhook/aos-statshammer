import React from 'react';
import { storiesOf } from '@storybook/react';
import { DefaultTooltip } from 'components/GraphTooltips';
import { lightTheme } from 'themes';
import { number, text } from '@storybook/addon-knobs';
import Container from 'utils/Container';
import { generatePayload } from './graphTooltipStoryUtils';

storiesOf('Components/GraphTooltips', module).add('Default', () => {
  const numSeries = number('Num Series', 2, { min: 1, max: 5 });
  const payload = generatePayload(lightTheme, numSeries);

  return (
    <Container variant="paper">
      <DefaultTooltip active payload={payload} label={text('Label', 'Label')} />
    </Container>
  );
});
