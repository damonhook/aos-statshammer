import { Typography, useTheme } from '@material-ui/core'
import { useZoomArea } from 'hooks'
import React, { useCallback, useMemo, useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceArea,
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

interface ProbabilityLineGraphProps {
  probabilities?: ProbabilityData[]
  nameMapping: NameMapping
  type: 'cumulative' | 'discrete'
  displaySave?: string
  referenceLines?: number[]
}

const ProbabilityLineGraph = ({
  probabilities,
  nameMapping,
  type,
  displaySave,
  referenceLines,
}: ProbabilityLineGraphProps) => {
  const theme = useTheme()
  const data = useMemo(() => {
    return transformData(probabilities ?? [], nameMapping)
  }, [nameMapping, probabilities])

  const colors = useMemo(
    () => getLoopingArray(theme.palette.graphs.series, Object.keys(nameMapping).length),
    [theme.palette.graphs.series, nameMapping]
  )

  const zoomCallback = useCallback((area: { x1: number; x2: number }) => {
    console.log(area)
  }, [])

  const [zoomArea, zoomProps] = useZoomArea(zoomCallback)

  return (
    <div>
      <Typography align="center" variant="h6" style={{ fontWeight: 'normal' }}>
        {`${startWithUppercase(type)} Probability (${displaySave})`}
      </Typography>
      <ResponsiveContainer height={300} width="99%">
        <LineChart data={data} {...zoomProps}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.graphs.grid} />
          <XAxis
            dataKey="damage"
            stroke={theme.palette.graphs.axis}
            type="number"
            tickCount={10}
            domain={[0, 'dataMax']}
          />
          <YAxis stroke={theme.palette.graphs.axis} />
          <Tooltip />
          <Legend />
          {(referenceLines ?? []).map((x, index) => (
            <ReferenceLine x={x} stroke={colors[index] ?? theme.palette.graphs.axis} strokeDasharray="3 3" />
          ))}
          {Object.values(nameMapping).map((name, index) => (
            <Line
              type="monotone"
              dataKey={name}
              stroke={colors[index]}
              dot={{ fill: theme.palette.background.paper, strokeWidth: 1, r: 2 }}
              activeDot={{ stroke: theme.palette.background.paper, strokeWidth: 2, r: 4 }}
            />
          ))}
          {zoomArea.x1 != null && zoomArea.x2 != null && (
            <ReferenceArea x1={zoomArea.x1} x2={zoomArea.x2} fill={theme.palette.action.focus} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ProbabilityLineGraph
