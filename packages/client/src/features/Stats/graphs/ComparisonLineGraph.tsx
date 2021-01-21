import { Typography } from '@material-ui/core'
import React, { useMemo } from 'react'
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ComparisonResult } from 'types/store/comparison'
import { NameMapping } from 'types/store/units'

import { transformData } from './transform'

interface ComparisonLineGraphProps {
  nameMapping: NameMapping
  results: ComparisonResult[]
}

const ComparisonLineGraph = ({ nameMapping, results }: ComparisonLineGraphProps) => {
  const data = useMemo(() => transformData(results, nameMapping), [results, nameMapping])
  return (
    <div>
      <Typography align="center" variant="h6" style={{ fontWeight: 'normal' }}>
        Average Damage
      </Typography>
      <ResponsiveContainer height={300} width="100%">
        <LineChart data={data}>
          <XAxis dataKey="save" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.values(nameMapping).map(name => (
            <Line dataKey={name} fill="#8884d8" />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ComparisonLineGraph
