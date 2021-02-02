import { makeStyles, Theme } from '@material-ui/core'
import { getComparison } from 'api/comparison'
import { getSimulations } from 'api/simulations'
import isEqual from 'lodash/isEqual'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeTargetSelector } from 'store/selectors/targetSelectors'
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
  const dispatch = useDispatch()
  const units = useSelector(activeUnitsSelector, isEqual)
  const target = useSelector(activeTargetSelector, isEqual)
  const simulations = useSelector((state: Store) => state.simulations)
  const comparison = useSelector((state: Store) => state.comparison)
  const numSimulations = useSelector((state: Store) => state.config.numSimulations)
  const nameMapping = useMemo(() => getNameMapping(units), [units])

  useEffect(() => {
    dispatch(getSimulations({ units: units, limit: numSimulations, target }))
  }, [dispatch, numSimulations, target, units])

  useEffect(() => {
    dispatch(getComparison({ units: units, target }))
  }, [dispatch, target, units])

  const loading = simulations.pending || comparison.pending

  return (
    <div className={classes.simulations}>
      <SimulationsToolbar units={units} target={target} loading={loading} />
      <SimulationsContent
        simResults={simulations.results}
        comparisonResults={comparison.results}
        nameMapping={nameMapping}
        loading={loading}
      />
    </div>
  )
}

export default React.memo(Simulations)
