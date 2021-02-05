import { isEqual } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { ComparisonResult } from 'types/store/comparison'
import { NameMapping } from 'types/store/units'

import { PDF_GRAPHS } from '../pdfConfig'
import ComparisonBarCanvas from './canvas/ComparisonBarCanvas'
import ComparisonLineCanvas from './canvas/ComparisonLineCanvas'

interface ComparisonGraphsProps {
  nameMapping: NameMapping
  results: ComparisonResult[]
  onRenderedCallback: () => void
}

const ComparisonGraphs = ({ nameMapping, results, onRenderedCallback }: ComparisonGraphsProps) => {
  const [comparisonBar, setComparisonBar] = useState(false)
  const [comparisonLine, setComparisonLine] = useState(false)

  useEffect(() => {
    if (comparisonBar && comparisonLine) {
      onRenderedCallback()
    }
  }, [comparisonBar, comparisonLine, onRenderedCallback])

  const handleBarRendered = useCallback(() => setComparisonBar(true), [])
  const handleLineRendered = useCallback(() => setComparisonLine(true), [])

  return (
    <div id={PDF_GRAPHS.comparison.id}>
      <ComparisonBarCanvas
        nameMapping={nameMapping}
        results={results}
        onRenderedCallback={handleBarRendered}
      />
      <ComparisonLineCanvas
        nameMapping={nameMapping}
        results={results}
        onRenderedCallback={handleLineRendered}
      />
    </div>
  )
}

export default React.memo(ComparisonGraphs, isEqual)
