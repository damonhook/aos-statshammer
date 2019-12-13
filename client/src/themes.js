import { createMuiTheme } from '@material-ui/core/styles';
import { grey, red, teal } from '@material-ui/core/colors';

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    background: {
      nested: '#fff',
      paper: '#fff',
      default: grey[100],
    },
    graphs: {
      grid: grey[300],
      axis: grey[700],
      tooltip: grey[50],
      series: [
        '#8884d8',
        '#82ca9d',
        '#ff7300',
        '#413ea0',
        '#f50057',
      ],
    },
  },
  typography: {
    htmlFontSize: 18,
    h6: {
      fontSize: '1rem',
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: teal[500],
    },
    secondary: {
      main: red[500],
    },
    background: {
      nested: grey[800],
      paper: '#333',
      default: grey[900],
    },
    graphs: {
      grid: grey[700],
      axis: grey[400],
      tooltip: grey[900],
      series: [
        '#8884d8',
        '#82ca9d',
        '#ff7300',
        '#5c6bc0',
        '#ff5252',
      ],
    },
  },
  typography: {
    htmlFontSize: 18,
    h6: {
      fontSize: '1rem',
    },
  },
});

const getTheme = (config) => (config.darkMode ? darkTheme : lightTheme);

export { lightTheme, darkTheme, getTheme as default };
