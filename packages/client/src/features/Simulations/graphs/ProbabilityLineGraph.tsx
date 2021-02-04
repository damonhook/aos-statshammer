import { Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { ProbabilityTooltip } from 'components/GraphTooltips'
import { isEqual } from 'lodash'
import React, { useMemo } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  LineChartProps,
  LineProps,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ProbabilityData } from 'types/store/simulations'
import { NameMapping } from 'types/store/units'
import { getLoopingArray, startWithUppercase } from 'utils/helpers'

import { transformData } from './transform'

interface ProbabilityLineGraphProps extends Omit<LineChartProps, 'data'> {
  probabilities?: ProbabilityData[]
  nameMapping: NameMapping
  type: 'cumulative' | 'discrete'
  displaySave?: string
  referenceLines?: number[]
  inverted?: boolean
  LineProps?: Partial<Omit<LineProps, 'dataKey'>>
}

const ProbabilityLineGraph = ({
  probabilities,
  nameMapping,
  type,
  displaySave,
  referenceLines,
  inverted,
  LineProps,
  ...props
}: ProbabilityLineGraphProps) => {
  const theme = useTheme()

  const data = useMemo(() => {
    return transformData(probabilities ?? [], nameMapping)
  }, [nameMapping, probabilities])

  const colors = useMemo(
    () => getLoopingArray(theme.palette.graphs.series, Object.keys(nameMapping).length),
    [theme.palette.graphs.series, nameMapping]
  )

  return (
    <div>
      <Typography align="center" variant="h6" style={{ fontWeight: 'normal' }}>
        {`${startWithUppercase(type)} Probability (${displaySave})`}
      </Typography>
      <ResponsiveContainer height={300} width="100%">
        <LineChart data={data} {...props}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.graphs.grid} />
          <XAxis
            dataKey="damage"
            stroke={theme.palette.graphs.axis}
            type="number"
            tickCount={10}
            domain={[0, 'dataMax']}
          />
          <YAxis stroke={theme.palette.graphs.axis} />
          <Tooltip content={<ProbabilityTooltip cumulative={type === 'cumulative'} inverted={inverted} />} />
          <Legend />
          {(referenceLines ?? []).map((x, index) => (
            <ReferenceLine
              x={x}
              key={x}
              stroke={colors[index] ?? theme.palette.graphs.axis}
              strokeDasharray="3 3"
            />
          ))}
          {Object.entries(nameMapping).map(([id, name], index) => (
            <Line
              type="monotone"
              dataKey={name}
              key={id}
              stroke={colors[index]}
              dot={{ fill: theme.palette.background.paper, strokeWidth: 1, r: type == 'discrete' ? 1 : 0 }}
              activeDot={{ stroke: theme.palette.background.paper, strokeWidth: 2, r: 4 }}
              connectNulls
              {...LineProps}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default React.memo(ProbabilityLineGraph, isEqual)
