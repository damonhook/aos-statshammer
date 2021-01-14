import React, { useState } from 'react'
import LeftNavigation from 'components/LeftNavigation'
import { AppBar, Toolbar, Typography, IconButton, makeStyles, Theme } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import clsx from 'clsx'
import { useIsMobile } from 'hooks'

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
  const isMobile = useIsMobile()

  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)

  return (
    <>
      <AppBar
        position="fixed"
        elevation={1}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open && !isMobile,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, { [classes.hide]: open && !isMobile })}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" style={{ cursor: 'pointer' }}>
            AoS Statshammer
          </Typography>
        </Toolbar>
      </AppBar>
      <LeftNavigation open={open} onOpen={handleDrawerOpen} onClose={handleDrawerClose} width={drawerWidth} />
    </>
  )
}

export default Header
