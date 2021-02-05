import { useTheme } from '@material-ui/core'
import { ResponsiveLineCanvas } from '@nivo/line'
import { useCanvasRendered } from 'hooks'
import { isEqual } from 'lodash'
import React, { createRef, useMemo } from 'react'
import { ComparisonResult } from 'types/store/comparison'
import { NameMapping } from 'types/store/units'
import { getLoopingArray } from 'utils/helpers'

import { PDF_GRAPHS } from '../../pdfConfig'

interface ComparisonLineCanvasProps {
  nameMapping: NameMapping
  results: ComparisonResult[]
  onRenderedCallback: () => void
}

type TransformedData = {
  id: string
  data: { x: string; y: number }[]
}

function transformData(results: ComparisonResult[], nameMapping: NameMapping): TransformedData[] {
  return Object.entries(nameMapping).map(([id, name]) => {
    const transformed: TransformedData = { id: name, data: [] }
    results.forEach(({ displaySave, values }) => {
      transformed.data.push({ x: displaySave, y: values[id] ?? 0 })
    })
    return transformed
  })
}

const ComparisonLineCanvas = ({ nameMapping, results, onRenderedCallback }: ComparisonLineCanvasProps) => {
  const theme = useTheme()
  const ref = createRef<HTMLDivElement>()

  const data = useMemo(() => transformData(results, nameMapping), [results, nameMapping])
  const colors = useMemo(
    () => getLoopingArray(theme.palette.graphs.series, Object.keys(nameMapping).length),
    [theme.palette.graphs.series, nameMapping]
  )
  const keys = useMemo(() => Object.values(nameMapping), [nameMapping])

  useCanvasRendered({ ref, callback: onRenderedCallback })

  return (
    <div ref={ref} style={{ height: 300 }}>
      <ResponsiveLineCanvas
        data={data}
        colors={colors}
        margin={PDF_GRAPHS.comparison.margin}
        axisTop={{
          legend: 'Average Damage',
          tickSize: 0,
          legendPosition: 'middle',
          legendOffset: -20,
          tickValues: [],
        }}
        isInteractive={false}
        enableGridX
        pixelRatio={2}
        pointSize={4}
        lineWidth={1.5}
        theme={{
          grid: {
            line: {
              stroke: theme.palette.graphs.grid,
            },
          },
        }}
      />
    </div>
  )
}

export default React.memo(ComparisonLineCanvas, isEqual)
