import { ThemeProvider } from '@material-ui/core'
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline'
import React, { useCallback, useEffect, useState } from 'react'
import { lightTheme } from 'themes'
import { ComparisonResult } from 'types/store/comparison'
import { SimulationResult } from 'types/store/simulations'
import { NameMapping } from 'types/store/units'

import ComparisonGraphs from './graphs/ComparisonGraphs'
import SimulationsGraphs from './graphs/SimulationsGraphs'

interface GraphLoaderProps {
  nameMapping: NameMapping
  comparisonResults: ComparisonResult[]
  simulationResults: SimulationResult[]
  onRenderedCallback: () => void
}

const GraphLoader = ({
  nameMapping,
  comparisonResults,
  simulationResults,
  onRenderedCallback,
}: GraphLoaderProps) => {
  const [comparisonRendered, setComparisonRendered] = useState(false)
  const [simulationRendered, setSimulationRendered] = useState(false)

  useEffect(() => {
    if (comparisonRendered && simulationRendered) {
      setTimeout(() => onRenderedCallback(), 300)
    }
  }, [comparisonRendered, simulationRendered, onRenderedCallback])

  const handleComparisonRendered = useCallback(() => setComparisonRendered(true), [])
  const handleSimulationRendered = useCallback(() => setSimulationRendered(true), [])

  return (
    <ThemeProvider theme={lightTheme}>
      <ScopedCssBaseline>
        <ComparisonGraphs
          results={comparisonResults}
          nameMapping={nameMapping}
          onRenderedCallback={handleComparisonRendered}
        />
        <SimulationsGraphs
          results={simulationResults}
          nameMapping={nameMapping}
          onRenderedCallback={handleSimulationRendered}
        />
      </ScopedCssBaseline>
    </ThemeProvider>
  )
}

export default GraphLoader
