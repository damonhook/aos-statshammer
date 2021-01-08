import { createMuiTheme, Theme, ThemeOptions } from '@material-ui/core/styles'
import { teal } from '@material-ui/core/colors'

const commonOtions: Partial<ThemeOptions> = {
  typography: {
    htmlFontSize: 19,
    h6: {
      fontSize: '1rem',
    },
  },
  mixins: {
    toolbar: {
      minHeight: 52,
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
  },
  ...commonOtions,
})

export const darkTheme: Theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  ...commonOtions,
})
