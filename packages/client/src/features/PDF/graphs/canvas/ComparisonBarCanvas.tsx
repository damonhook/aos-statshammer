import { useTheme } from '@material-ui/core'
import { ResponsiveBarCanvas } from '@nivo/bar'
import { useCanvasRendered } from 'hooks'
import { isEqual } from 'lodash'
import React, { createRef, useMemo } from 'react'
import { ComparisonResult } from 'types/store/comparison'
import { NameMapping } from 'types/store/units'
import { getLoopingArray } from 'utils/helpers'

import { PDF_GRAPHS } from '../../pdfConfig'

interface ComparisonBarCanvasProps {
  nameMapping: NameMapping
  results: ComparisonResult[]
  onRenderedCallback: () => void
}

type TransformedData = {
  save: string
  [name: string]: string
}

function transformData(results: ComparisonResult[], nameMapping: NameMapping): TransformedData[] {
  return results.map(({ displaySave, values }) => {
    const data: TransformedData = { save: displaySave }
    Object.keys(values).forEach(id => {
      const name = nameMapping[id] ?? 'Unknown'
      data[name] = `${values[id]}`
    })
    return data
  })
}

const ComparisonBarCanvas = ({ nameMapping, results, onRenderedCallback }: ComparisonBarCanvasProps) => {
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
      <ResponsiveBarCanvas
        data={data}
        indexBy="save"
        keys={keys}
        groupMode="grouped"
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
        enableLabel={false}
        enableGridX
        pixelRatio={2}
      />
    </div>
  )
}

export default React.memo(ComparisonBarCanvas, isEqual)
