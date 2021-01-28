import {
  Divider,
  IconButton,
  List,
  makeStyles,
  SwipeableDrawer,
  Theme,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon, ChevronLeft } from '@material-ui/icons'
import clsx from 'clsx'
import { LogoIcon } from 'components/Icons'
import { useCurrentRoute, useIsMobile } from 'hooks'
import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { configStore } from 'store/slices'
import Store from 'types/store'
import { PAGE_ROUTES } from 'utils/routes'

import ClearTargetItem from './ClearTargetItem'
import ClearUnitsItem from './ClearUnitsItem'
import ListItem from './components/ListItem'
import NavItems from './NavItems'

interface StyleProps {
  width: number
}

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: ({ width }: StyleProps) => ({
    width: width,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  drawerClose: ({ width }: StyleProps) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7),
    [theme.breakpoints.down('sm')]: {
      width: width,
    },
  }),
  spacer: {
    width: theme.spacing(7),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    display: 'flex',
    height: '100%',
    paddingLeft: theme.spacing(5) + 2,
    // paddingLeft: '44.2px',
  },
}))

interface LeftNavigationProps {
  open: boolean
  onOpen: () => void
  onClose: () => void
  width?: number
}

const LeftNavigation = ({ open, onOpen, onClose, width = 240 }: LeftNavigationProps) => {
  const classes = useStyles({ width })
  const theme = useTheme()
  const route = useCurrentRoute()
  const isMobile = useIsMobile()
  const isMd = useMediaQuery(theme.breakpoints.down('md'))

  const { darkMode } = useSelector((state: Store) => state.config)
  const dispatch = useDispatch()

  const handleDarkModeToggle = useCallback(() => {
    dispatch(configStore.actions.setDarkMode({ darkMode: !darkMode }))
  }, [dispatch, darkMode])

  const drawerVariant = useMemo(() => {
    return isMobile || (isMd && open) ? 'temporary' : 'permanent'
  }, [isMd, isMobile, open])

  const handleItemClick = useCallback(() => {
    if (isMd || isMobile) onClose()
  }, [isMd, isMobile, onClose])

  return (
    <>
      {!isMobile && isMd && open && <div className={classes.spacer}></div>}
      <SwipeableDrawer
        variant={drawerVariant}
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <div className={classes.logo}>
            <LogoIcon color="primary" fontSize="large" />
          </div>
          <IconButton onClick={onClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List>
          <NavItems route={route} open={open} onClose={handleItemClick} />
          <Divider />
          <ListItem
            primary={darkMode ? 'Light Mode' : 'Dark Mode'}
            onClick={handleDarkModeToggle}
            icon={darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            tooltip={!open}
          />
          {route === PAGE_ROUTES.HOME && <ClearUnitsItem open={open} onClose={handleItemClick} />}
          {route === PAGE_ROUTES.HOME && <ClearTargetItem open={open} onClose={handleItemClick} />}
        </List>
      </SwipeableDrawer>
    </>
  )
}

export default LeftNavigation
