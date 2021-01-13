import React, { lazy, Suspense } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Header from 'components/Header'
import HomeSkeleton from 'components/Skeletons/pages/HomeSkeleton'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import BottomNavigation from 'components/BottomNavigation/BottomNavigation'

// const Home = lazy(() => import('features/Home'))
const Home = lazy(async () => {
  await new Promise(r => setTimeout(r, 500))
  return await import('features/Home')
})

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  inner: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    width: '100%',
    maxWidth: 1600,
  },
  appBarShift: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}))

const App = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Router>
        <Header />
        <div className={classes.inner}>
          <main className={classes.content}>
            <div className={classes.appBarShift} />
            <Suspense fallback={<HomeSkeleton />}>
              <Switch>
                <Route path="/" component={Home} />
              </Switch>
            </Suspense>
          </main>
          <BottomNavigation />
        </div>
      </Router>
    </div>
  )
}

export default App
