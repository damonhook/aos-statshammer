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
import { BarChart, ChevronLeft, Home, PictureAsPdf, Info, Timeline } from '@material-ui/icons'
import clsx from 'clsx'
import React from 'react'
import { useIsMobile } from 'hooks'
import ListItemLink from './ListItemLink'

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

interface LeftNavigationProps {
  open: boolean
  onOpen: () => void
  onClose: () => void
  width?: number
}

const LeftNavigation = ({ open, onOpen, onClose, width = 240 }: LeftNavigationProps) => {
  const classes = useStyles({ width })
  const theme = useTheme()
  const isMobile = useIsMobile()
  const showStatsLink = useMediaQuery(theme.breakpoints.down('md'))

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
        <ListItemLink primary="Home" to="/" icon={<Home />} tooltip={!open} />
        {showStatsLink && <ListItemLink primary="Stats" to="/" icon={<BarChart />} tooltip={!open} />}
        <ListItemLink primary="Simulations" to="/" icon={<Timeline />} tooltip={!open} />
        <ListItemLink primary="Download PDF" to="/" icon={<PictureAsPdf />} tooltip={!open} />
        <ListItemLink primary="About" to="/" icon={<Info />} tooltip={!open} />
      </List>
    </SwipeableDrawer>
  )
}

export default LeftNavigation
