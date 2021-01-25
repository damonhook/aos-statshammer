import { Button, makeStyles, Theme } from '@material-ui/core'
import { ArrowBack, InfoOutlined, Refresh } from '@material-ui/icons'
import { getSimulations } from 'api/simulations'
import ResponsiveIconButton from 'components/ResponsiveIconButton'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Modifier } from 'types/modifierInstance'
import { Unit } from 'types/store/units'
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

interface SimulationsToolbarProps {
  units: Unit[]
  targetModifiers: Modifier[]
  loading?: boolean
}

const SimulationsToolbar = ({ units, targetModifiers, loading }: SimulationsToolbarProps) => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const handleReturn = useCallback(() => {
    history.replace(PAGE_ROUTES.HOME)
  }, [history])

  const handleRerun = useCallback(() => {
    dispatch(getSimulations({ units: units }))
  }, [dispatch, units])

  return (
    <div className={classes.toolbar}>
      <div className={classes.section}>
        <ResponsiveIconButton icon={<ArrowBack />} text="Return" onClick={handleReturn} />
        <ResponsiveIconButton
          icon={<Refresh />}
          text="Rerun Simulations"
          onClick={handleRerun}
          disabled={!!loading}
        />
      </div>
      <div className={classes.section}>
        <Button disabled={!!loading}># Simulations: 5000</Button>
        <ResponsiveIconButton icon={<InfoOutlined />} text="Info" />
      </div>
    </div>
  )
}

export default SimulationsToolbar
