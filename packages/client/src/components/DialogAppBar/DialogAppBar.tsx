import { AppBar, IconButton, makeStyles, Theme, Toolbar, Tooltip, Typography } from '@material-ui/core'
import { Close, HelpOutline } from '@material-ui/icons'
import React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    position: 'relative',
  },
  closeButton: {
    marginRight: theme.spacing(1),
  },
  icon: {
    color: theme.palette.primary.contrastText,
  },
}))

interface DialogAppBarProps {
  id?: string
  title: string
  onClose: () => void
  startHelp?: () => void
}

const DialogAppBar = ({ id, title, onClose, startHelp }: DialogAppBarProps) => {
  const classes = useStyles()

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton onClick={onClose} className={classes.closeButton}>
          <Close className={classes.icon} />
        </IconButton>
        <Typography variant="h6" id={id} style={{ flex: 1 }}>
          {title}
        </Typography>
        {startHelp && (
          <Tooltip title="Help">
            <IconButton onClick={startHelp}>
              <HelpOutline className={classes.icon} />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default DialogAppBar
