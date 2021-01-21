import { Typography } from '@material-ui/core'
import React, { useMemo } from 'react'
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { ComparisonResult } from 'types/store/comparison'
import { NameMapping } from 'types/store/units'

import { transformData } from './transform'

interface ComparisonRadarGraphProps {
  nameMapping: NameMapping
  results: ComparisonResult[]
}

const ComparisonRadarGraph = ({ nameMapping, results }: ComparisonRadarGraphProps) => {
  const data = useMemo(() => transformData(results, nameMapping), [results, nameMapping])
  return (
    <div>
      <Typography align="center" variant="h6" style={{ fontWeight: 'normal' }}>
        Average Damage
      </Typography>
      <ResponsiveContainer height={300} width="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="save" />
          <PolarRadiusAxis />
          <Tooltip />
          {Object.values(nameMapping).map(name => (
            <Radar dataKey={name} fill="#8884d8" />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ComparisonRadarGraph
