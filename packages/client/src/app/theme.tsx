import { teal } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: teal,
    info: teal,
  },
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          position: 'fixed',
          bottom: 64,
          right: 16,
        },
      },
    },
  },
})

export default theme
