import { Grid, useTheme } from '@material-ui/core'
import { ComparisonBarGraph, ComparisonLineGraph, ComparisonRadarGraph } from 'features/Stats/graphs'
import { isEqual } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { ComparisonResult } from 'types/store/comparison'
import { NameMapping } from 'types/store/units'

import { graphIds } from '../generator/config'

interface ComparisonGraphsProps {
  nameMapping: NameMapping
  results: ComparisonResult[]
  onRenderedCallback: () => void
}

const ComparisonGraphs = ({ nameMapping, results, onRenderedCallback }: ComparisonGraphsProps) => {
  const [comparisonBar, setComparisonBar] = useState(false)
  const [comparisonLine, setComparisonLine] = useState(false)
  const [comparisonRadar, setComparisonRadar] = useState(false)

  useEffect(() => {
    if (comparisonBar && comparisonLine && comparisonRadar) {
      onRenderedCallback()
    }
  }, [comparisonBar, comparisonLine, comparisonRadar, onRenderedCallback])

  const handleBarRendered = useCallback(() => setComparisonBar(true), [])
  const handleLineRendered = useCallback(() => setComparisonLine(true), [])
  const handleRadarRendered = useCallback(() => setComparisonRadar(true), [])

  return (
    <Grid container spacing={1} id={graphIds.comparisonGraphs}>
      <Grid item xs={12} style={{ marginBottom: 20 }}>
        <ComparisonBarGraph
          results={results}
          nameMapping={nameMapping}
          BarProps={{ animationDuration: 0, onAnimationEnd: handleBarRendered }}
        />
      </Grid>
      <Grid item xs={8}>
        <ComparisonLineGraph
          results={results}
          nameMapping={nameMapping}
          LineProps={{ animationDuration: 0, onAnimationEnd: handleLineRendered }}
        />
      </Grid>
      <Grid item xs={4}>
        <ComparisonRadarGraph
          results={results}
          nameMapping={nameMapping}
          RadarProps={{ animationDuration: 0, onAnimationEnd: handleRadarRendered }}
        />
      </Grid>
    </Grid>
  )
}

export default React.memo(ComparisonGraphs, isEqual)
