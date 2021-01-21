import { Button, makeStyles, Theme } from '@material-ui/core'
import { ArrowBack, InfoOutlined, Refresh } from '@material-ui/icons'
import ResponsiveIconButton from 'components/ResponsiveIconButton'
import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { PAGE_ROUTES } from 'utils/routes'

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0.5, 0.5, 1),
    alignItems: 'center',
  },
  section: {
    '& > *': {
      marginRight: theme.spacing(1),
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
}))

const SimulationsToolbar = () => {
  const classes = useStyles()
  const history = useHistory()

  const handleReturn = useCallback(() => {
    history.replace(PAGE_ROUTES.HOME)
  }, [history])

  return (
    <div className={classes.toolbar}>
      <div className={classes.section}>
        <ResponsiveIconButton icon={<ArrowBack />} text="Return" onClick={handleReturn} />
        <ResponsiveIconButton icon={<Refresh />} text="Rerun Simulations" />
      </div>
      <div className={classes.section}>
        <Button># Simulations: 5000</Button>
        <ResponsiveIconButton icon={<InfoOutlined />} text="Info" />
      </div>
    </div>
  )
}

export default SimulationsToolbar
