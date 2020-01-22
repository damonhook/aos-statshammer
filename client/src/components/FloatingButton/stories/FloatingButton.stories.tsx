import React from 'react';
import { storiesOf } from '@storybook/react';
import FloatingButton from 'components/FloatingButton';
import { Add as AddIcon, GetApp as DownloadIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { boolean, select } from '@storybook/addon-knobs';
import ScrollContainer from 'utils/ScrollContainer';
import { action } from '@storybook/addon-actions';
import Container from 'utils/Container';

const ICONS = {
  Add: AddIcon,
  Download: DownloadIcon,
  Delete: DeleteIcon,
};

storiesOf('Components/FloatingButton', module)
  .add('Basic', () => {
    const icon = select('Icon', Object.keys(ICONS), 'Add');
    const IconComponent = ICONS[icon];
    return (
      <Container>
        <FloatingButton
          onClick={action('fab-clicked')}
          icon={<IconComponent />}
          disabled={boolean('Disabled', false)}
        />
      </Container>
    );
  })

  .add('With Scroll', () => {
    const icon = select('Icon', Object.keys(ICONS), 'Add');
    const IconComponent = ICONS[icon];
    return (
      <ScrollContainer>
        <FloatingButton
          onClick={action('fab-clicked')}
          icon={<IconComponent />}
          disabled={boolean('Disabled', false)}
        />
      </ScrollContainer>
    );
  });
