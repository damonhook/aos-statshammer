import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { GithubButton, RedditButton, ReleasesButton, WarcryStatshammerButton } from 'components/SocialButtons'
import { useCurrentRoute, useIsMobile } from 'hooks'
import React from 'react'
import { PAGE_ROUTES } from 'utils/routes'

const useStyles = makeStyles(theme => ({
  footer: {
    textAlign: 'center',
    width: '100%',
  },
  paper: {
    padding: '1em',
  },
  Actions: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
  mobileActions: {
    justifyContent: 'flex-start',
    padding: theme.spacing(1.5, 0),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1, 0, 0),
    },
  },
  footerButton: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
  },
}))

/**
 * The footer that appears at the bottom of the page
 */
const Footer = () => {
  const classes = useStyles()
  const mobile = useIsMobile()
  const route = useCurrentRoute()

  if (route === PAGE_ROUTES.EXPORT) return null

  return (
    <footer className={classes.footer}>
      <Paper className={clsx(classes.paper)} square>
        <Typography variant="body1" component="p">
          Built by: Damon Hook&nbsp;
          <i>(NomadHook)</i>
        </Typography>
        <Typography variant="body2" component="p">
          Disclaimer: This tool is in no way endorsed or sanctioned by Games Workshop - it is unofficial and
          fan-made. I take absolutely no credit for any of the Games Workshop content displayed above.
        </Typography>
        <Typography component="div" className={clsx(classes.Actions, mobile ? classes.mobileActions : null)}>
          <GithubButton className={classes.footerButton} />
          <RedditButton className={classes.footerButton} />
          <ReleasesButton className={classes.footerButton} />
          <WarcryStatshammerButton className={classes.footerButton} />
        </Typography>
      </Paper>
    </footer>
  )
}

export default Footer
