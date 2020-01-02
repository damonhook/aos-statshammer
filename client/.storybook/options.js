import { create } from "@storybook/theming";

const options = {
  options: {
    isFullscreen: false,
    panelPosition: 'right',
    isToolshown: true,
    sortStoriesByKind: true,
    theme: create({
      base: 'light',
      fontBase: '"Roboto", sans-serif',
      fontCode: 'monospace',
    })
  },
};

export { options as default };
