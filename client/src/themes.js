import { createMuiTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
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
      main: '#5c6bc0',
    },
    secondary: {
      main: '#ff5252',
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
