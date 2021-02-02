import { Grid, makeStyles, Tab, Tabs, Theme, useTheme } from '@material-ui/core'
import { getModifiers } from 'api/modifiers'
import StatsSkeleton from 'components/Skeletons/pages/StatsSkeleton'
import TargetSkeleton from 'components/Skeletons/pages/TargetSkeleton'
import UnitsSkeleton from 'components/Skeletons/pages/UnitsSkeleton'
import { useIsMobile } from 'hooks'
import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import { uiStore } from 'store/slices'
import Store from 'types/store'
import { HomeTab } from 'types/store/ui'
import { PAGE_ROUTES } from 'utils/routes'

import TabPanel from './TabPanel'

function a11yProps(index: any) {
  return {
    id: `home-tab-${index}`,
    'aria-controls': `home-tabpanel-${index}`,
  }
}

type TabConfig = { id: HomeTab; title: string; route: string }
const tabConfig: TabConfig[] = [
  { id: 'units', title: 'Units', route: '/' },
  { id: 'target', title: 'Target', route: '/target' },
]

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
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useIsMobile()
  const dispatch = useDispatch()
  const [animate, setAnimate] = useState(false)

  const { tab } = useSelector((state: Store) => state.ui.home)
  const { modifiers, targetModifiers } = useSelector((state: Store) => state.modifiers)

  const value = useMemo(() => {
    const idx = tabConfig.findIndex(t => t.id === tab)
    return idx >= 0 ? idx : 0
  }, [tab])

  useEffect(() => {
    if (!modifiers || !modifiers.length || !targetModifiers || !targetModifiers.length) {
      dispatch(getModifiers())
    }
  }, [dispatch, modifiers, targetModifiers])

  const handleChange = (event: React.ChangeEvent<any>, index: number) => {
    const { id } = tabConfig[index]
    dispatch(uiStore.actions.setHomeUI({ tab: id }))
  }

  const handleSwipe = (index: number) => {
    const { id } = tabConfig[index]
    dispatch(uiStore.actions.setHomeUI({ tab: id }))
  }

  const onSwitching = (index: number, type: 'move' | 'end') => {
    if (type === 'move') setAnimate(true)
    else setTimeout(() => setAnimate(false), 250)
  }

  return (
    <div className={classes.root} style={{ padding: 4 }}>
      <Redirect from={PAGE_ROUTES.STATS} to={PAGE_ROUTES.HOME} />
      <Grid container spacing={1} style={{ flex: 1 }}>
        <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="home tabs"
          >
            {tabConfig.map(({ id, title }, index) => (
              <Tab label={title} key={id} {...a11yProps(index)} />
            ))}
          </Tabs>
          <div style={{ height: '100%' }}>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleSwipe}
              style={{ height: '100%' }}
              containerStyle={{ height: '100%' }}
              onSwitching={onSwitching}
              animateTransitions={animate}
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
