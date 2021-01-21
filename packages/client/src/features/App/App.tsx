import { CssBaseline } from '@material-ui/core'
import { makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles'
import BottomNavigation from 'components/BottomNavigation'
import Header from 'components/Header'
import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import getTheme from 'themes'
import Store from 'types/store'

import AppContent from './AppContent'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  inner: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
}))

const App = () => {
  const classes = useStyles()

  const config = useSelector((state: Store) => state.config)

  return (
    <ThemeProvider theme={getTheme(config)}>
      <CssBaseline />
      <div className={classes.root}>
        <Router>
          <Header />
          <div className={classes.inner}>
            <AppContent />
            <BottomNavigation />
          </div>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
