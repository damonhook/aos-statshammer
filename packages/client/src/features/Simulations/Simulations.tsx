import { makeStyles, Theme } from '@material-ui/core'
import { getSimulations } from 'api/simulations'
import isEqual from 'lodash/isEqual'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeUnitsSelector } from 'store/selectors/unitsSelectors'
import Store from 'types/store'
import { NameMapping, Unit } from 'types/store/units'

import SimulationsContent from './SimulationsContent'
import SimulationsToolbar from './SimulationsToolbar'

function getNameMapping(units: Unit[]): NameMapping {
  return units.reduce<NameMapping>((acc, { id, name }) => ({ ...acc, [id]: name }), {})
}

const useStyles = makeStyles((theme: Theme) => ({
  simulations: {
    margin: theme.spacing(1),
  },
  toolbar: {
    padding: theme.spacing(0.5, 0.5, 1),
  },
  collection: {
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
}))

const Simulations = () => {
  const classes = useStyles()
  const units = useSelector(activeUnitsSelector, isEqual)
  const targetModifiers = useSelector((state: Store) => state.target.modifiers, isEqual)
  const { results, pending } = useSelector((state: Store) => state.simulations)
  const dispatch = useDispatch()
  const nameMapping = useMemo(() => getNameMapping(units), [units])

  useEffect(() => {
    dispatch(getSimulations({ units: units }))
  }, [dispatch, units, targetModifiers])

  return (
    <div className={classes.simulations}>
      <SimulationsToolbar units={units} targetModifiers={targetModifiers} loading={pending} />
      <SimulationsContent results={results} nameMapping={nameMapping} loading={pending} />
    </div>
  )
}

export default Simulations
