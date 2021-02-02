import { Typography, useTheme } from '@material-ui/core'
import { ComparisonTooltip } from 'components/GraphTooltips'
import React, { useMemo } from 'react'
import {
  Legend,
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
import { getLoopingArray } from 'utils/helpers'

import { transformData } from './transform'

interface ComparisonRadarGraphProps {
  nameMapping: NameMapping
  results: ComparisonResult[]
}

const ComparisonRadarGraph = ({ nameMapping, results }: ComparisonRadarGraphProps) => {
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
        <RadarChart data={data}>
          <PolarGrid stroke={theme.palette.graphs.grid} />
          <PolarAngleAxis dataKey="save" stroke={theme.palette.graphs.axis} />
          <PolarRadiusAxis stroke={theme.palette.graphs.axis} />
          <Tooltip content={<ComparisonTooltip />} cursor={{ stroke: theme.palette.graphs.axis }} />
          <Legend />
          {Object.entries(nameMapping).map(([id, name], index) => (
            <Radar key={id} dataKey={name} fill={colors[index]} fillOpacity={0.1} stroke={colors[index]} />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ComparisonRadarGraph
