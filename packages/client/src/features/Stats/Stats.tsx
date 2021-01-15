import { Skeleton } from '@material-ui/lab'
import CollapsibleCard from 'components/CollapsibleCard'
import GraphSkeleton from 'components/Skeletons/GraphSkeleton'
import TableSkeleton from 'components/Skeletons/TableSkeleton'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Store from 'types/store'
import TargetSummary from './TargetSummary'
import { getComparison } from 'api/comparison'
import isEqual from 'lodash/isEqual'
import ComparisonTable from './ComparisonTable'
import { NameMapping, Unit } from 'types/store/units'
import ComparisonGraphs from './ComparisonGraphs'

function getNameMapping(units: Unit[]): NameMapping {
  return units.reduce<NameMapping>((acc, { id, name }) => ({ ...acc, [id]: name }), {})
}

const Stats = () => {
  const units = useSelector((state: Store) => state.units.items, isEqual)
  const target = useSelector((state: Store) => state.target, isEqual)
  const { results, pending } = useSelector((state: Store) => state.comparison)
  const dispatch = useDispatch()
  const nameMapping = useMemo(() => getNameMapping(units), [units])

  useEffect(() => {
    dispatch(getComparison({ units: units }))
  }, [dispatch, units, target])

  return (
    <div>
      <TargetSummary />
      <CollapsibleCard title="Average Damage Table">
        {pending ? (
          <TableSkeleton rows={units.length + 1} columns={3} dense />
        ) : (
          <ComparisonTable nameMapping={nameMapping} results={results} />
        )}
      </CollapsibleCard>
      <CollapsibleCard title="Graphs">
        <ComparisonGraphs nameMapping={nameMapping} results={results} pending={pending} />
      </CollapsibleCard>
    </div>
  )
}

export default React.memo(Stats)
