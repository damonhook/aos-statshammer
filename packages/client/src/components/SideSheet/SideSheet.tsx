import { Drawer, DrawerProps,makeStyles, Theme } from '@material-ui/core'
import { useIsMobile } from 'hooks'
import React from 'react'

interface SideSheetProps extends Omit<DrawerProps, 'open' | 'anchor' | 'PaperProps'> {
  open?: boolean
  maxWidth?: number
  spacing?: number
  children?: React.ReactNode
}

interface SideSheetStyleProps {
  maxWidth: number
  spacing: number
}

const useStyles = makeStyles((theme: Theme) => ({
  drawer: ({ maxWidth, spacing }: SideSheetStyleProps) => ({
    width: `calc(100% - ${spacing}px)`,
    maxWidth: maxWidth,
    [theme.breakpoints.down('sm')]: {
      height: '100%',
      width: '100%',
      maxWidth: 'none',
    },
  }),
}))

const SideSheet = ({ open, maxWidth = 1280, spacing = 64, children, ...props }: SideSheetProps) => {
  const isMobile = useIsMobile()
  const classes = useStyles({ maxWidth, spacing })

  return (
    <Drawer
      open={open}
      anchor={isMobile ? 'bottom' : 'right'}
      PaperProps={{ className: classes.drawer }}
      {...props}
    >
      {children}
    </Drawer>
  )
}

export default React.memo(SideSheet)
