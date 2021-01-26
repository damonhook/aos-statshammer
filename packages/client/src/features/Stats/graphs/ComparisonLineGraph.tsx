import { Typography, useTheme } from '@material-ui/core'
import { ComparisonTooltip } from 'components/GraphTooltips'
import React, { useMemo } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ComparisonResult } from 'types/store/comparison'
import { NameMapping } from 'types/store/units'
import { getLoopingArray } from 'utils/helpers'

import { transformData } from './transform'

interface ComparisonLineGraphProps {
  nameMapping: NameMapping
  results: ComparisonResult[]
}

const ComparisonLineGraph = ({ nameMapping, results }: ComparisonLineGraphProps) => {
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
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.graphs.grid} />
          <XAxis dataKey="save" stroke={theme.palette.graphs.axis} />
          <YAxis stroke={theme.palette.graphs.axis} />
          <Tooltip content={<ComparisonTooltip />} />
          <Legend />
          {Object.values(nameMapping).map((name, index) => (
            <Line
              type="monotone"
              dataKey={name}
              stroke={colors[index]}
              dot={{ fill: theme.palette.background.paper, strokeWidth: 1, r: 2 }}
              activeDot={{ stroke: theme.palette.background.paper, strokeWidth: 2, r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ComparisonLineGraph
