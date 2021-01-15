import React, { useCallback, useMemo } from 'react'
import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction,
  makeStyles,
  Theme,
} from '@material-ui/core'
import { useCurrentRoute, useIsMobile } from 'hooks'
import { PageRoute, PAGE_ROUTES } from 'utils/routes'
import { useHistory } from 'react-router-dom'

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
  { label: 'Home', route: PAGE_ROUTES.HOME },
  { label: 'Stats', route: PAGE_ROUTES.STATS },
  { label: 'Simulations', route: PAGE_ROUTES.SIMULATIONS },
  { label: 'About', route: PAGE_ROUTES.ABOUT },
]

const BottomNavigation = () => {
  const classes = useStyles()
  const isMobile = useIsMobile()
  const history = useHistory()
  const route = useCurrentRoute()

  const value = useMemo(() => {
    let index = navConfig.findIndex(n => n.route === route)
    return index !== -1 ? index : 0
  }, [route])

  const handleChange = useCallback(
    (event: React.ChangeEvent<{}>, newIndex: number) => {
      history.push(navConfig[newIndex].route)
    },
    [history]
  )

  return isMobile ? (
    <>
      <div style={{ paddingTop: 56 }}></div>
      <MuiBottomNavigation value={value} onChange={handleChange} className={classes.bottomNav} showLabels>
        {navConfig.map(({ label }) => (
          <BottomNavigationAction label={label} key={label} />
        ))}
      </MuiBottomNavigation>
    </>
  ) : null
}

export default BottomNavigation
