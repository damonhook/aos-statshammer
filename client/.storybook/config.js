import { configure, addDecorator, addParameters } from '@storybook/react';
import { configureViewport } from '@storybook/addon-viewport';
import { withKnobs } from '@storybook/addon-knobs';
import options from './options';
import StoryRouter from 'storybook-react-router';
import { withProvider } from "utils/exampleStore";
import { lightTheme, darkTheme } from "themes";
import { ThemeProvider } from '@material-ui/core/styles';
import { muiTheme } from 'storybook-addon-material-ui';

addParameters(options)
addDecorator(withKnobs)
addDecorator(withProvider)
addDecorator(muiTheme([lightTheme, darkTheme]))
addDecorator(StoryRouter())

const containers = require.context('../src/containers', true, /\.story\.js$/);
const components = require.context('../src/components', true, /\.story\.js$/);

const loadStories = () => {
  containers.keys().forEach(containers);
  components.keys().forEach(components);
};

configure(loadStories, module);
