import { Grid } from '@material-ui/core'
import ProbabilityLineGraph from 'features/Simulations/graphs/ProbabilityLineGraph'
import { usePrevious } from 'hooks'
import { isEqual } from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ProbabilityData, SimulationResult } from 'types/store/simulations'
import { NameMapping } from 'types/store/units'

import { graphIds } from '../generator/config'

type SaveGraphRendered = { [s: number]: boolean }

interface SimGraphProps {
  nameMapping: NameMapping
  save: number
  displaySave: string
  results: ProbabilityData[]
  type: 'cumulative' | 'discrete'
  onRenderedCallback: (s: number) => void
}

const SimGraph = React.memo(
  ({ nameMapping, save, displaySave, results, type, onRenderedCallback }: SimGraphProps) => {
    const [rendered, setRendered] = useState(false)
    const previous = usePrevious(rendered)

    const handleRendered = useCallback(() => {
      setRendered(true)
    }, [])

    useEffect(() => {
      if (!previous && rendered) onRenderedCallback(save)
    }, [onRenderedCallback, previous, rendered, save])

    return (
      <Grid item xs={6} key={save}>
        <ProbabilityLineGraph
          probabilities={results}
          nameMapping={nameMapping}
          type={type}
          displaySave={displaySave}
          LineProps={{
            animationDuration: 0,
            onAnimationEnd: handleRendered,
          }}
        />
      </Grid>
    )
  }
)

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
      <Grid container spacing={1} id={graphIds.cumulativeGraphs}>
        {results.map(result => (
          <SimGraph
            key={`cumulative-${result.save}`}
            nameMapping={nameMapping}
            save={result.save}
            displaySave={result.displaySave}
            results={result.cumulative}
            type="cumulative"
            onRenderedCallback={handleSetCumulativeRendered}
          />
        ))}
      </Grid>
      <Grid container spacing={1} id={graphIds.discreteGraphs}>
        {results.map(result => (
          <SimGraph
            key={`discrete-${result.save}`}
            nameMapping={nameMapping}
            save={result.save}
            displaySave={result.displaySave}
            results={result.discrete}
            type="discrete"
            onRenderedCallback={handleSetDiscreteRendered}
          />
        ))}
      </Grid>
    </>
  )
}

export default React.memo(SimulationsGraphs, isEqual)
