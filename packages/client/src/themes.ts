import { grey, red, teal } from '@material-ui/core/colors'
import { createMuiTheme, Theme, ThemeOptions } from '@material-ui/core/styles'
import ConfigStore from 'types/store/config'

const commonOtions: Partial<ThemeOptions> = {
  typography: {
    htmlFontSize: 19,
    h6: {
      fontSize: '1rem',
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '0.8rem',
      },
    },
  },
}

export const lightTheme: Theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: teal,
    graphs: {
      grid: grey[300],
      axis: grey[700],
      tooltip: grey[50],
      series: ['#8884d8', '#82ca9d', '#ff7300', teal[400], '#f50057'],
    },
  },
  ...commonOtions,
})

export const darkTheme: Theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: teal[500] },
    secondary: { main: red[500] },
    graphs: {
      grid: grey[700],
      axis: grey[400],
      tooltip: grey[900],
      series: ['#8884d8', '#82ca9d', '#ff7300', teal[400], '#ff5252'],
    },
  },
  ...commonOtions,
})

const getTheme = (config: ConfigStore) => (config.darkMode ? darkTheme : lightTheme)

export default getTheme
