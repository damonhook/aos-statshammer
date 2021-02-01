import {
  AppBar,
  IconButton,
  Link,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import clsx from 'clsx'
import LeftNavigation from 'components/LeftNavigation'
import React, { useState } from 'react'
import { PAGE_ROUTES } from 'utils/routes'

import PageHelp from './PageHelp'

const drawerWidth = 220

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(2),
    },
  },
  hide: {
    display: 'none',
  },
}))

const Header = () => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.down('md'))

  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)

  return (
    <>
      <AppBar
        position="fixed"
        elevation={1}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open && !isMd,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, { [classes.hide]: open && !isMd })}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" style={{ flex: 1 }}>
            <Link href={PAGE_ROUTES.HOME} color="inherit" underline="none">
              AoS Statshammer
            </Link>
          </Typography>
          <PageHelp />
        </Toolbar>
      </AppBar>
      <LeftNavigation open={open} onOpen={handleDrawerOpen} onClose={handleDrawerClose} width={drawerWidth} />
    </>
  )
}

export default Header
