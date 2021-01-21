import { makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import { InfoOutlined } from '@material-ui/icons'
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
}

const DEFAULT_TITLE = "It's lonely here"
const DEFAULT_DESCRIPTION = 'There are no items here, try adding some'

const NewItemsCard = ({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION }: NewItemsCardProps) => {
  const classes = useStyles()

  return (
    <Paper className={classes.card}>
      <div className={classes.icon}>
        <InfoOutlined fontSize="large" />
      </div>
      <div className={classes.info}>
        <Typography variant="h6">{title}</Typography>
        <Typography>{description}</Typography>
      </div>
    </Paper>
  )
}

export default NewItemsCard
