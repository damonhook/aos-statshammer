import { Typography, useTheme } from '@material-ui/core'
import React, { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ComparisonResult } from 'types/store/comparison'
import { NameMapping } from 'types/store/units'
import { getLoopingArray } from 'utils/helpers'

import { transformData } from './transform'

interface ComparisonBarGraphProps {
  nameMapping: NameMapping
  results: ComparisonResult[]
}

const ComparisonBarGraph = ({ nameMapping, results }: ComparisonBarGraphProps) => {
  const theme = useTheme()
  const data = useMemo(() => transformData(results, nameMapping), [results, nameMapping])
  const colors = useMemo(
    () => getLoopingArray(theme.palette.graphs.series, Object.keys(nameMapping).length),
    [theme.palette.graphs.series, nameMapping]
  )

  return (
    <div>
      <Typography align="center" variant="h6" style={{ fontWeight: 'normal' }}>
        Average Damage
      </Typography>
      <ResponsiveContainer height={300} width="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.graphs.grid} />
          <XAxis dataKey="save" stroke={theme.palette.graphs.axis} />
          <YAxis stroke={theme.palette.graphs.axis} />
          <Tooltip cursor={{ fill: theme.palette.action.focus, strokeWidth: 2 }} />
          <Legend />
          {Object.values(nameMapping).map((name, index) => (
            <Bar dataKey={name} fill={colors[index]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
export default ComparisonBarGraph
