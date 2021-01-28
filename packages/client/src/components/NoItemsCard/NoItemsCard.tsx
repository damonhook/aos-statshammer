import { makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import { InfoOutlined } from '@material-ui/icons'
import { Alert, AlertTitle, Color } from '@material-ui/lab'
import clsx from 'clsx'
import React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    padding: theme.spacing(2),
    alignItems: 'center',
  },
  icon: {
    display: 'flex',
    flex: '0 0 auto',
    marginRight: theme.spacing(2),
  },
  info: {
    flex: '1 1 auto',
  },
}))

interface NewItemsCardProps {
  title?: string
  description?: string
  variant?: Color
  className?: string
}

const DEFAULT_TITLE = "It's lonely here"
const DEFAULT_DESCRIPTION = 'There are no items here, try adding some'

const NewItemsCard = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  variant = 'info',
  className,
}: NewItemsCardProps) => {
  const classes = useStyles()

  return (
    <Paper elevation={0}>
      <Alert className={clsx(classes.card, className)} severity={variant} variant="outlined">
        <AlertTitle>
          <Typography variant="h6">{title}</Typography>
        </AlertTitle>
        <Typography>{description}</Typography>
      </Alert>
    </Paper>
  )
}

export default NewItemsCard
