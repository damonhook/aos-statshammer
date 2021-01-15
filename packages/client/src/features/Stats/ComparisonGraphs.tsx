import { Skeleton } from '@material-ui/lab'
import GraphSkeleton from 'components/Skeletons/GraphSkeleton'
import React from 'react'
import { ComparisonResult } from 'types/store/comparison'
import { NameMapping } from 'types/store/units'
import ComparisonBarGraph from './graphs/ComparisonBarGraph'

interface ComparisonGraphsProps {
  nameMapping: NameMapping
  results: ComparisonResult[]
  pending: boolean
}

const ComparisonGraphs = ({ nameMapping, results, pending }: ComparisonGraphsProps) => {
  return (
    <div>
      <Skeleton variant="rect" height={48} style={{ marginBottom: 10 }} />
      {pending ? (
        <GraphSkeleton series={6} groups={2} includeTitle />
      ) : (
        <ComparisonBarGraph nameMapping={nameMapping} results={results} />
      )}
    </div>
  )
}

export default ComparisonGraphs
