import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction,
  makeStyles,
  Theme,
} from '@material-ui/core'
import { BarChart, Home, Info, Timeline } from '@material-ui/icons'
import { useCurrentRoute, useIsMobile } from 'hooks'
import React, { useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { PAGE_ROUTES, PageRoute } from 'utils/routes'

const useStyles = makeStyles((theme: Theme) => ({
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
}))

interface NavItemConfig {
  label: string
  route: PageRoute
  icon?: React.ReactNode
}

const navConfig: NavItemConfig[] = [
  { label: 'Home', route: PAGE_ROUTES.HOME, icon: <Home /> },
  { label: 'Stats', route: PAGE_ROUTES.STATS, icon: <BarChart /> },
  { label: 'Simulations', route: PAGE_ROUTES.SIMULATIONS, icon: <Timeline /> },
  { label: 'About', route: PAGE_ROUTES.ABOUT, icon: <Info /> },
]

const BottomNavigation = () => {
  const classes = useStyles()
  const isMobile = useIsMobile()
  const history = useHistory()
  const route = useCurrentRoute()

  const value = useMemo(() => {
    const index = navConfig.findIndex(n => n.route === route)
    return index !== -1 ? index : 0
  }, [route])

  const handleChange = useCallback(
    (event: React.ChangeEvent<any>, newIndex: number) => {
      history.push(navConfig[newIndex].route)
    },
    [history]
  )

  return isMobile ? (
    <>
      <div style={{ paddingTop: 56 }}></div>
      <MuiBottomNavigation value={value} onChange={handleChange} className={classes.bottomNav} showLabels>
        {navConfig.map(({ label, icon }) => (
          <BottomNavigationAction label={label} key={label} icon={icon} />
        ))}
      </MuiBottomNavigation>
    </>
  ) : null
}

export default BottomNavigation
