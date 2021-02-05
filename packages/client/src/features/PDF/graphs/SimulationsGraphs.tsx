import { usePrevious } from 'hooks'
import { isEqual } from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SimulationResult } from 'types/store/simulations'
import { NameMapping } from 'types/store/units'

import { PDF_GRAPHS } from '../pdfConfig'
import CumulativeLineCanvas from './canvas/CumulativeLineCanvas'
import DiscreteLineCanvas from './canvas/DiscreteLineCanvas'

type SaveGraphRendered = { [s: number]: boolean }

interface SimGraphProps {
  nameMapping: NameMapping
  results: SimulationResult
  onRenderedCallback: (s: number) => void
}

const CumulativeSimGraph = React.memo(({ nameMapping, results, onRenderedCallback }: SimGraphProps) => {
  const [rendered, setRendered] = useState(false)
  const previous = usePrevious(rendered)

  const handleRendered = useCallback(() => {
    setRendered(true)
  }, [])

  useEffect(() => {
    if (!previous && rendered) onRenderedCallback(results.save)
  }, [onRenderedCallback, previous, rendered, results.save])

  return (
    <CumulativeLineCanvas nameMapping={nameMapping} results={results} onRenderedCallback={handleRendered} />
  )
})

const DiscreteSimGraph = React.memo(({ nameMapping, results, onRenderedCallback }: SimGraphProps) => {
  const [rendered, setRendered] = useState(false)
  const previous = usePrevious(rendered)

  const handleRendered = useCallback(() => {
    setRendered(true)
  }, [])

  useEffect(() => {
    if (!previous && rendered) onRenderedCallback(results.save)
  }, [onRenderedCallback, previous, rendered, results.save])

  return (
    <DiscreteLineCanvas nameMapping={nameMapping} results={results} onRenderedCallback={handleRendered} />
  )
})

interface SimulationsGraphsProps {
  nameMapping: NameMapping
  results: SimulationResult[]
  onRenderedCallback: () => void
}

const SimulationsGraphs = ({ nameMapping, results, onRenderedCallback }: SimulationsGraphsProps) => {
  const initial = useMemo(() => results.reduce((acc, { save }) => ({ ...acc, [save]: false }), {}), [results])
  const [cumulative, setCumulative] = useState<SaveGraphRendered>({ ...initial })
  const [discrete, setDiscrete] = useState<SaveGraphRendered>({ ...initial })

  useEffect(() => {
    const cumulativeValues = Object.values(cumulative)
    const discreteValues = Object.values(discrete)
    if (
      cumulativeValues.length &&
      discreteValues.length &&
      cumulativeValues.every(v => v) &&
      discreteValues.every(v => v)
    ) {
      onRenderedCallback()
    }
  }, [cumulative, discrete, onRenderedCallback])

  const handleSetCumulativeRendered = useCallback(
    (save: number) => {
      setCumulative({ ...cumulative, [save]: true })
    },
    [cumulative]
  )

  const handleSetDiscreteRendered = useCallback(
    (save: number) => {
      setDiscrete({ ...discrete, [save]: true })
    },
    [discrete]
  )

  return (
    <>
      <div id={PDF_GRAPHS.cumulative.id}>
        {results.map(result => (
          <CumulativeSimGraph
            key={`cumulative-${result.save}`}
            nameMapping={nameMapping}
            results={result}
            onRenderedCallback={handleSetCumulativeRendered}
          />
        ))}
      </div>
      <div id={PDF_GRAPHS.discrete.id}>
        {results.map(result => (
          <DiscreteSimGraph
            key={`discrete-${result.save}`}
            nameMapping={nameMapping}
            results={result}
            onRenderedCallback={handleSetDiscreteRendered}
          />
        ))}
      </div>
    </>
  )
}

export default React.memo(SimulationsGraphs, isEqual)
