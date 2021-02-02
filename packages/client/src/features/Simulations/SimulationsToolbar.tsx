import { Button, makeStyles, Theme } from '@material-ui/core'
import { ArrowBack, InfoOutlined, Refresh } from '@material-ui/icons'
import { getSimulations } from 'api/simulations'
import ResponsiveIconButton from 'components/ResponsiveIconButton'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Modifier } from 'types/modifierInstance'
import Store from 'types/store'
import { Target } from 'types/store/target'
import { Unit } from 'types/store/units'
import { HASH_ROUTES, PAGE_ROUTES } from 'utils/routes'

import SimulationControls from './SimulationControls'
import SimulationsInfo from './SimulationsInfo'

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
  target: Target
  loading?: boolean
}

const SimulationsToolbar = ({ units, target, loading }: SimulationsToolbarProps) => {
  const classes = useStyles()
  const numSimulations = useSelector((state: Store) => state.config.numSimulations)
  const history = useHistory()
  const dispatch = useDispatch()

  const handleReturn = useCallback(() => {
    history.replace(PAGE_ROUTES.HOME)
  }, [history])

  const handleRerun = useCallback(() => {
    dispatch(getSimulations({ units: units, limit: numSimulations, target }))
  }, [dispatch, numSimulations, target, units])

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
        <SimulationControls loading={loading} />
        <ResponsiveIconButton icon={<InfoOutlined />} text="Info" href={HASH_ROUTES.SIM_INFO} />
      </div>
      <SimulationsInfo />
    </div>
  )
}

export default SimulationsToolbar
