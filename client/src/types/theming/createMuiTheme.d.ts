// eslint-disable-next-line @typescript-eslint/no-unused-vars
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions {
    name: string;
  }

  interface Theme {
    name: string;
  }
}
