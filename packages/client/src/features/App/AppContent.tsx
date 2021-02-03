import { Box } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import HomeSkeleton from 'components/Skeletons/pages/HomeSkeleton'
import { useIsMobile } from 'hooks'
import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { PAGE_ROUTES } from 'utils/routes'

const Home = lazy(() => import('features/Home'))
const Stats = lazy(() => import('features/Stats'))
const Simulations = lazy(() => import('features/Simulations'))
const PDF = lazy(() => import('features/PDF'))
const About = lazy(() => import('features/About'))

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    width: '100%',
    maxWidth: 1600,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
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
  const isMobile = useIsMobile()

  return (
    <main className={classes.content}>
      <div className={classes.appBarShift} />
      <Suspense fallback={<HomeSkeleton />}>
        <Switch>
          <Route exact path={PAGE_ROUTES.ABOUT} component={About} />
          {isMobile && <Route exact path={PAGE_ROUTES.STATS} component={Stats} />}
          <Route path={PAGE_ROUTES.SIMULATIONS} component={Simulations} />
          <Route path={PAGE_ROUTES.EXPORT} component={PDF} />
          <Route path={PAGE_ROUTES.HOME} component={Home} />
        </Switch>
      </Suspense>
      <Box marginBottom={1}></Box>
    </main>
  )
}

export default App
