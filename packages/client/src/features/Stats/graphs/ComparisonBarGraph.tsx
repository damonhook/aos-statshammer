import { Typography, useTheme } from '@material-ui/core'
import { ComparisonTooltip } from 'components/GraphTooltips'
import React, { useMemo } from 'react'
import {
  Bar,
  BarChart,
  BarChartProps,
  BarProps,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ComparisonResult } from 'types/store/comparison'
import { NameMapping } from 'types/store/units'
import { getLoopingArray } from 'utils/helpers'

import { transformData } from './transform'

interface ComparisonBarGraphProps extends Omit<BarChartProps, 'data'> {
  nameMapping: NameMapping
  results: ComparisonResult[]
  BarProps?: Partial<Omit<BarProps, 'dataKey'>>
}

const ComparisonBarGraph = ({ nameMapping, results, BarProps, ...props }: ComparisonBarGraphProps) => {
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
        <BarChart data={data} {...props}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.graphs.grid} />
          <XAxis dataKey="save" stroke={theme.palette.graphs.axis} />
          <YAxis stroke={theme.palette.graphs.axis} />
          <Tooltip
            content={<ComparisonTooltip />}
            cursor={{ fill: theme.palette.action.focus, strokeWidth: 2 }}
          />
          <Legend />
          {Object.entries(nameMapping).map(([id, name], index) => (
            <Bar dataKey={name} fill={colors[index]} key={id} {...BarProps} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
export default ComparisonBarGraph
