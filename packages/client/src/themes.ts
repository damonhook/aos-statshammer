import { createMuiTheme, Theme } from '@material-ui/core/styles'

const commonOtions = {
  typography: {
    htmlFontSize: 19,
    h6: {
      fontSize: '1rem',
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
  },
  ...commonOtions,
})

export const darkTheme: Theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  ...commonOtions,
})
