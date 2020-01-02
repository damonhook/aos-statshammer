import React from 'react';
import { storiesOf } from '@storybook/react';
import Tabbed, { RoutedTabs } from 'components/Tabbed';
import Container from 'utils/Container';
import { loremIpsum } from 'utils/lorem';
import { number } from '@storybook/addon-knobs';

const lorem = loremIpsum.generateParagraphs(1);

storiesOf('Components/Tabbed', module)
  .add('Basic', () => {
    const numTabs = number('Num Tabs', 3, { min: 1, max: 6 });
    return (
      <Container>
        <Tabbed
          tabNames={[...Array(numTabs)].map((_, index) => `Tab ${index + 1}`)}
          tabContent={[...Array(numTabs)].map((_, index) => (
            <div style={{ paddingTop: '8px' }}>
              <Container variant="paper" fullHeight={false}>
                <h2>{`Tab ${index + 1} content`}</h2>
                <p>{lorem}</p>
              </Container>
            </div>
          ))}
        />
      </Container>
    );
  })

  .add('Routed', () => {
    const numTabs = number('Num Tabs', 3, { min: 1, max: 6 });
    return (
      <Container>
        <RoutedTabs
          tabNames={[...Array(numTabs)].map((_, index) => `Tab ${index + 1}`)}
          tabContent={[...Array(numTabs)].map((_, index) => (
            <div style={{ paddingTop: '8px' }}>
              <Container variant="paper" fullHeight={false}>
                <h2>{`Tab ${index + 1} content`}</h2>
                <p>{lorem}</p>
              </Container>
            </div>
          ))}
          tabRoutes={[...Array(numTabs)].map((_, index) => `/${index + 1}`)}
        />
      </Container>
    );
  });
