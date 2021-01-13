import React, { useState } from 'react'
import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction,
  makeStyles,
  Theme,
} from '@material-ui/core'
import { useIsMobile } from 'hooks'

const useStyles = makeStyles((theme: Theme) => ({
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
}))

const BottomNavigation = () => {
  const [value, setValue] = useState(0)
  const classes = useStyles()
  const isMobile = useIsMobile()

  return isMobile ? (
    <MuiBottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      className={classes.bottomNav}
      showLabels
    >
      <BottomNavigationAction label="Home" />
      <BottomNavigationAction label="Stats" />
      <BottomNavigationAction label="Simulations" />
      <BottomNavigationAction label="About" />
    </MuiBottomNavigation>
  ) : null
}

export default BottomNavigation
