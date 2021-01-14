import React, { useState, useEffect, lazy, Suspense } from 'react'
import TabPanel from './TabPanel'
import { Grid, Tab, Tabs, useTheme, makeStyles, Theme, useMediaQuery } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import { useDispatch, useSelector } from 'react-redux'
import Store from 'types/store'
import { getModifiers } from 'api/modifiers'
import UnitsSkeleton from 'components/Skeletons/pages/UnitsSkeleton'
import StatsSkeleton from 'components/Skeletons/pages/StatsSkeleton'
import TargetSkeleton from 'components/Skeletons/pages/TargetSkeleton'

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

const tabConfig = {
  units: { title: 'Units', route: '/' },
  target: { title: 'Target', route: '/target' },
  stats: { title: 'Stats', route: '/stats' },
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  statsAside: {
    marginTop: theme.spacing(4),
  },
}))

// const Units = lazy(() => import('features/Units'))
// const Target = lazy(() => import('features/Target'))
// const Stats = lazy(() => import('features/Stats'))

const Units = lazy(async () => {
  await new Promise(r => setTimeout(r, 500))
  return await import('features/Units')
})

const Target = lazy(async () => {
  await new Promise(r => setTimeout(r, 2000))
  return await import('features/Target')
})

const Stats = lazy(async () => {
  await new Promise(r => setTimeout(r, 2000))
  return await import('features/Stats')
})

const Home = () => {
  const [value, setValue] = useState(0)
  const classes = useStyles()
  const theme = useTheme()
  const statsAsTab = useMediaQuery(theme.breakpoints.down('sm'))
  const dispatch = useDispatch()

  const { modifiers, targetModifiers } = useSelector((state: Store) => state.modifiers)

  useEffect(() => {
    if (!statsAsTab && value === 2) setValue(0)
  }, [statsAsTab, value, setValue])

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
      <Grid container spacing={1} style={{ flex: 1 }}>
        <Grid item xs={12} md={6}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label={tabConfig.units.title} {...a11yProps(0)} />
            <Tab label={tabConfig.target.title} {...a11yProps(1)} />
            {statsAsTab && <Tab label={tabConfig.stats.title} {...a11yProps(2)} />}
          </Tabs>
          <div>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
              style={{ height: '100%' }}
              containerStyle={{ height: '100%' }}
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
              {!!statsAsTab && (
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <Suspense fallback={<StatsSkeleton />}>
                    <Stats />
                  </Suspense>
                </TabPanel>
              )}
            </SwipeableViews>
          </div>
        </Grid>
        {!statsAsTab && (
          <Grid item xs>
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
