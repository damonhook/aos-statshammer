import { useTheme } from '@material-ui/core'
import { ResponsiveLineCanvas } from '@nivo/line'
import { useCanvasRendered } from 'hooks'
import { isEqual } from 'lodash'
import React, { createRef, useMemo } from 'react'
import { SimulationResult } from 'types/store/simulations'
import { NameMapping } from 'types/store/units'
import { getLoopingArray } from 'utils/helpers'

import { PDF_GRAPHS } from '../../pdfConfig'

interface DiscreteLineCanvasProps {
  nameMapping: NameMapping
  results: SimulationResult
  onRenderedCallback: () => void
}

type TransformedData = {
  id: string
  data: { x: number; y: number }[]
}

function transformData(results: SimulationResult, nameMapping: NameMapping): TransformedData[] {
  return Object.entries(nameMapping).map(([id, name]) => {
    const transformed: TransformedData = { id: name, data: [] }
    results.discrete.forEach(({ damage, ...values }) => {
      transformed.data.push({ x: damage, y: values[id] ?? 0 })
    })
    return transformed
  })
}

const DiscreteLineCanvas = ({ nameMapping, results, onRenderedCallback }: DiscreteLineCanvasProps) => {
  const theme = useTheme()
  const ref = createRef<HTMLDivElement>()

  const data = useMemo(() => transformData(results, nameMapping), [results, nameMapping])
  const colors = useMemo(
    () => getLoopingArray(theme.palette.graphs.series, Object.keys(nameMapping).length),
    [theme.palette.graphs.series, nameMapping]
  )
  const ticks = useMemo(() => [0, 5, 10, 15, 20], []) // TODO: Calculate

  useCanvasRendered({ ref, callback: onRenderedCallback })

  return (
    <div ref={ref} style={{ height: 300, width: '50%' }}>
      <ResponsiveLineCanvas
        data={data}
        colors={colors}
        margin={PDF_GRAPHS.discrete.margin}
        axisTop={{
          legend: `Discrete Probability (${results.displaySave})`,
          tickSize: 0,
          legendPosition: 'middle',
          legendOffset: -20,
          tickValues: [],
        }}
        axisBottom={{
          tickValues: ticks,
        }}
        gridXValues={ticks}
        enableGridX
        pixelRatio={2}
        isInteractive={false}
        // enablePoints={false}
        pointSize={2}
        lineWidth={1}
      />
    </div>
  )
}

export default React.memo(DiscreteLineCanvas, isEqual)
