import React, { lazy, Suspense } from 'react'
import { makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import Header from 'components/Header'
import { lightTheme } from 'themes'
import HomeSkeleton from 'components/Skeletons/HomeSkeleton'

// const Home = lazy(() => import('pages/Home'))
const Home = lazy(() => {
  return new Promise(r => setTimeout(r, 3000)).then(() => {
    return import('pages/Home')
  })
})

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  appBarShift: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}))

const App = () => {
  const classes = useStyles()

  return (
    <ThemeProvider theme={lightTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <main className={classes.content}>
          <div className={classes.appBarShift} />
          <Suspense fallback={<HomeSkeleton />}>
            <Home />
          </Suspense>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
