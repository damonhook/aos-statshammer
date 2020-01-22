import React from 'react';
import { storiesOf } from '@storybook/react';
import { ProbabilityTooltip } from 'components/GraphTooltips';
import { lightTheme } from 'themes';
import { number, boolean } from '@storybook/addon-knobs';
import Container from 'utils/Container';
import { generatePayload } from './graphTooltipStoryUtils';

storiesOf('Components/GraphTooltips', module).add('Probability', () => {
  const numSeries = number('Num Series', 2, { min: 1, max: 5 });
  const payload = generatePayload(lightTheme, numSeries);

  return (
    <Container variant="paper">
      <ProbabilityTooltip
        active
        payload={payload}
        label={number('Damage', 3, { min: 0, max: 100 })}
        cumulative={boolean('Cumulative', false)}
      />
    </Container>
  );
});
