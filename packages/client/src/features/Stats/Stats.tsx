import { Skeleton } from '@material-ui/lab'
import CollapsibleCard from 'components/CollapsibleCard'
import GraphSkeleton from 'components/Skeletons/GraphSkeleton'
import TableSkeleton from 'components/Skeletons/TableSkeleton'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Store from 'types/store'
import TargetSummary from './TargetSummary'

const Stats = () => {
  const units = useSelector((state: Store) => state.units.items)
  const target = useSelector((state: Store) => state.target)

  useEffect(() => {
    console.log('Stats Call')
  }, [units, target])

  return (
    <div style={{ marginRight: '10px' }}>
      <TargetSummary />
      <CollapsibleCard title="Average Damage Table">
        <TableSkeleton rows={7} columns={3} dense />
      </CollapsibleCard>
      <CollapsibleCard title="Graphs">
        <Skeleton variant="rect" height={48} style={{ marginBottom: 10 }} />
        <GraphSkeleton series={6} groups={2} includeTitle />
      </CollapsibleCard>
    </div>
  )
}

export default React.memo(Stats)
