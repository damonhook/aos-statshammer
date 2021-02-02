import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  section: { marginBottom: theme.spacing(2) },
}))

interface SectionProps {
  title?: string
  children?: React.ReactNode
}

const Section = ({ title, children }: SectionProps) => {
  const classes = useStyles()

  return (
    <div className={classes.section}>
      {title && (
        <Typography component="h3" variant="h6">
          {title}
        </Typography>
      )}
      <Typography>{children}</Typography>
    </div>
  )
}

export default Section
