import { Grid, makeStyles, Theme } from '@material-ui/core'
import CollapsibleCard from 'components/CollapsibleCard'
import GraphSkeleton from 'components/Skeletons/GraphSkeleton'
import TableSkeleton from 'components/Skeletons/TableSkeleton'
import ComparisonGraphs from 'features/Stats/ComparisonGraphs'
import React, { useCallback, useMemo, useState } from 'react'
import { ComparisonResult } from 'types/store/comparison'
import { Metric, ProbabilityData, SimulationResult } from 'types/store/simulations'
import { NameMapping } from 'types/store/units'

import CollectionControls, { CollectionControlsProps } from './CollectionControls'
import ProbabilityLineGraph from './graphs/ProbabilityLineGraph'
import MetricsTable from './MetricsTable'

function invertCumulative(nameMapping: NameMapping, data: SimulationResult): SimulationResult {
  const totals = Object.keys(nameMapping).reduce<{ [id: string]: number }>(
    (acc, id) => ({ ...acc, [id]: 100 }),
    {}
  )
  const cumulative = data.cumulative.map(({ damage, ...values }) => {
    const data: ProbabilityData = { damage }
    Object.entries(values).forEach(([id, value]) => {
      data[id] = totals[id]
      totals[id] = Math.max(totals[id] - value, 0)
    })
    return data
  })
  return { ...data, cumulative }
}

const useStyles = makeStyles((theme: Theme) => ({
  content: {},
  collection: {
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
}))

interface SimulationsContentProps {
  simResults: SimulationResult[]
  comparisonResults: ComparisonResult[]
  nameMapping: NameMapping
  loading?: boolean
}

const SimulationsContent = ({
  simResults,
  comparisonResults,
  nameMapping,
  loading,
}: SimulationsContentProps) => {
  const classes = useStyles()
  const [save, setSave] = useState(2)
  const [referenceLine, setReferenceLine] = useState<keyof Metric | undefined>(undefined)
  const [inverted, setInverted] = useState(false)

  const savesLookup = useMemo(() => {
    return simResults.map(r => ({ save: r.save, displaySave: r.displaySave }))
  }, [simResults])

  const handleSaveChange = useCallback((val: number) => setSave(val), [])
  const handleReferenceLineChange = useCallback((val?: keyof Metric) => setReferenceLine(val), [])
  const handleInvertedChange = useCallback((val: boolean) => setInverted(val), [])

  const controlProps: Omit<CollectionControlsProps, 'variant'> = {
    savesLookup,
    loading,
    save,
    referenceLine,
    inverted,
    onSaveChange: handleSaveChange,
    onReferenceLineChange: handleReferenceLineChange,
    onInvertedChange: handleInvertedChange,
  }

  const simData = useMemo(() => {
    const dataForSave = simResults.find(r => r.save === save)
    if (dataForSave) return inverted ? invertCumulative(nameMapping, dataForSave) : dataForSave
    return undefined
  }, [nameMapping, save, simResults, inverted])

  const referenceLineData = useMemo(() => {
    if (simData?.metrics && referenceLine)
      return Object.values(simData.metrics).map(values => values[referenceLine])
    return undefined
  }, [simData?.metrics, referenceLine])

  return (
    <div className={classes.content}>
      <div className={classes.collection}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <CollapsibleCard title="Cumulative Probability">
              <CollectionControls {...controlProps} variant="cumulative" />
              {loading ? (
                <GraphSkeleton series={6} groups={2} height={320} includeTitle />
              ) : (
                <ProbabilityLineGraph
                  probabilities={simData?.cumulative}
                  nameMapping={nameMapping}
                  displaySave={simData?.displaySave}
                  type="cumulative"
                  referenceLines={referenceLineData}
                  inverted={inverted}
                />
              )}
            </CollapsibleCard>
          </Grid>
          <Grid item xs={12} lg={6}>
            <CollapsibleCard title="Discrete Probability">
              <CollectionControls {...controlProps} variant="discrete" />
              {loading ? (
                <GraphSkeleton series={6} groups={2} height={320} includeTitle />
              ) : (
                <ProbabilityLineGraph
                  probabilities={simData?.discrete}
                  nameMapping={nameMapping}
                  displaySave={simData?.displaySave}
                  type="discrete"
                  referenceLines={referenceLineData}
                />
              )}
            </CollapsibleCard>
          </Grid>
        </Grid>
      </div>
      <div className={classes.collection}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CollapsibleCard title="Average Damage">
              <ComparisonGraphs nameMapping={nameMapping} results={comparisonResults} loading={loading} />
            </CollapsibleCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <CollapsibleCard title="Metrics">
              <CollectionControls {...controlProps} variant="metrics" />
              {loading ? (
                <TableSkeleton rows={3} columns={3} dense includeTitle />
              ) : (
                <MetricsTable
                  metrics={simData?.metrics}
                  nameMapping={nameMapping}
                  loading={loading}
                  displaySave={simData?.displaySave}
                />
              )}
            </CollapsibleCard>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default SimulationsContent
