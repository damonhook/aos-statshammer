import { Divider, IconButton, List, makeStyles, SwipeableDrawer, Theme } from '@material-ui/core'
import { BarChart, ChevronLeft, Home, PictureAsPdf, Info, Timeline } from '@material-ui/icons'
import clsx from 'clsx'
import React, { useMemo } from 'react'
import { useCurrentRoute, useIsMobile } from 'hooks'
import ListItemLink from './ListItemLink'
import { PageRoute, PAGE_ROUTES } from 'utils/routes'

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
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}))

interface NavItemConfig {
  label: string
  route: PageRoute
  icon: React.ReactNode
  onlyMobile?: boolean
}

const navConfig: NavItemConfig[] = [
  { label: 'Home', route: PAGE_ROUTES.HOME, icon: <Home /> },
  { label: 'Stats', route: PAGE_ROUTES.STATS, icon: <BarChart />, onlyMobile: true },
  { label: 'Simulations', route: PAGE_ROUTES.SIMULATIONS, icon: <Timeline /> },
  { label: 'Download PDF', route: PAGE_ROUTES.EXPORT, icon: <PictureAsPdf /> },
  { label: 'About', route: PAGE_ROUTES.ABOUT, icon: <Info /> },
]

interface LeftNavigationProps {
  open: boolean
  onOpen: () => void
  onClose: () => void
  width?: number
}

const LeftNavigation = ({ open, onOpen, onClose, width = 240 }: LeftNavigationProps) => {
  const classes = useStyles({ width })
  const isMobile = useIsMobile()
  const route = useCurrentRoute()

  const value = useMemo(() => {
    let index = navConfig.findIndex(n => (!n.onlyMobile || isMobile) && n.route === route)
    return index !== -1 ? index : 0
  }, [route, isMobile])

  return (
    <SwipeableDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
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
        <IconButton onClick={onClose}>
          <ChevronLeft />
        </IconButton>
      </div>
      <Divider />
      <List>
        {navConfig.map(
          ({ label, route, icon, onlyMobile }, index) =>
            (!onlyMobile || isMobile) && (
              <ListItemLink
                primary={label}
                to={route}
                icon={icon}
                tooltip={!open}
                selected={index === value}
                key={label}
              />
            )
        )}
      </List>
    </SwipeableDrawer>
  )
}

export default LeftNavigation
