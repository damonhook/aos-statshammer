import { configure, addDecorator, addParameters } from '@storybook/react';
import { configureViewport } from '@storybook/addon-viewport';
import { withKnobs } from '@storybook/addon-knobs';
import options from './options';

addParameters(options)
addDecorator(withKnobs)

const components = require.context('../src/components', true, /\.story\.js$/);

const loadStories = () => {
  components.keys().forEach(components);
};

configure(loadStories, module);
