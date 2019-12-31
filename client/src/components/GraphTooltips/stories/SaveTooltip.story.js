import React from 'react';
import { storiesOf } from '@storybook/react';
import { SaveTooltip } from 'components/GraphTooltips';
import { lightTheme } from 'themes';
import { number } from '@storybook/addon-knobs';
import { generatePayload } from './graphTooltipStoryUtils';

storiesOf('Components/GraphTooltips', module)
  .add('Save', () => {
    const numSeries = number('Num Series', 2, { min: 1, max: 5 });
    const payload = generatePayload(lightTheme, numSeries);

    return (
      <SaveTooltip
        active
        payload={payload}
        label={number('Save', 4, { min: 0, max: 6 })}
      />
    );
  });
