import { Grid, makeStyles, Tab, Tabs, Theme, useTheme } from '@material-ui/core'
import { getModifiers } from 'api/modifiers'
import StatsSkeleton from 'components/Skeletons/pages/StatsSkeleton'
import TargetSkeleton from 'components/Skeletons/pages/TargetSkeleton'
import UnitsSkeleton from 'components/Skeletons/pages/UnitsSkeleton'
import { useIsMobile } from 'hooks'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import Store from 'types/store'
import { PAGE_ROUTES } from 'utils/routes'

import TabPanel from './TabPanel'

function a11yProps(index: any) {
  return {
    id: `home-tab-${index}`,
    'aria-controls': `home-tabpanel-${index}`,
  }
}

const tabConfig = {
  units: { title: 'Units', route: '/' },
  target: { title: 'Target', route: '/target' },
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  statsAside: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

const Units = lazy(() => import('features/Units'))
const Target = lazy(() => import('features/Target'))
const Stats = lazy(() => import('features/Stats'))

// const Units = lazy(async () => {
//   await new Promise(r => setTimeout(r, 500))
//   return await import('features/Units')
// })

// const Target = lazy(async () => {
//   await new Promise(r => setTimeout(r, 2000))
//   return await import('features/Target')
// })

// const Stats = lazy(async () => {
//   await new Promise(r => setTimeout(r, 2000))
//   return await import('features/Stats')
// })

const Home = () => {
  const [value, setValue] = useState(0)
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useIsMobile()
  const dispatch = useDispatch()

  const { modifiers, targetModifiers } = useSelector((state: Store) => state.modifiers)

  useEffect(() => {
    if (!modifiers || !modifiers.length || !targetModifiers || !targetModifiers.length) {
      dispatch(getModifiers())
    }
  }, [dispatch, modifiers, targetModifiers])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }

  return (
    <div className={classes.root} style={{ padding: 4 }}>
      <Redirect from={PAGE_ROUTES.STATS} to={PAGE_ROUTES.HOME} />
      <Grid container spacing={1} style={{ flex: 1 }}>
        <Grid item xs={12} md={6}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="home tabs"
          >
            <Tab label={tabConfig.units.title} {...a11yProps(0)} />
            <Tab label={tabConfig.target.title} {...a11yProps(1)} />
          </Tabs>
          <div>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
              style={{ height: '100%' }}
              containerStyle={{ height: '100%' }}
              disableLazyLoading
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Suspense fallback={<UnitsSkeleton />}>
                  <Units />
                </Suspense>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <Suspense fallback={<TargetSkeleton />}>
                  <Target />
                </Suspense>
              </TabPanel>
            </SwipeableViews>
          </div>
        </Grid>
        {!isMobile && (
          <Grid item xs md={6}>
            <div className={classes.statsAside}>
              <Suspense fallback={<StatsSkeleton />}>
                <Stats />
              </Suspense>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  )
}

export default Home
