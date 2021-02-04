import { makeStyles, ThemeProvider } from '@material-ui/core'
import { getComparison } from 'api/comparison'
import { getModifiers } from 'api/modifiers'
import { getSimulations } from 'api/simulations'
import type jsPDF from 'jspdf'
import { isEqual } from 'lodash'
import pdfobject from 'pdfobject'
import React, { createRef, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeTargetSelector } from 'store/selectors/targetSelectors'
import { activeUnitsSelector } from 'store/selectors/unitsSelectors'
import Store from 'types/store'
import { NameMapping, Unit } from 'types/store/units'

import generatePdf from './generator'
import PdfGraphs from './graphs'
import Loader from './Loader'

function getNameMapping(units: Unit[]): NameMapping {
  return units.reduce<NameMapping>((acc, { id, name }) => ({ ...acc, [id]: name }), {})
}
const useStyles = makeStyles(() => ({
  pdfContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  pdfGenerator: {},
  hidden: {
    width: 800,
    position: 'absolute',
    left: -2000,
  },
  docView: {
    display: 'flex',
    flex: 1,
    '> *': {
      display: 'flex',
    },
  },
}))

interface DocViewProps {
  doc: jsPDF
}
const DocView = React.memo(({ doc }: DocViewProps) => {
  const ref = createRef<HTMLDivElement>()

  useEffect(() => {
    if (ref.current) {
      pdfobject.embed(doc.output('datauristring', { filename: 'aos-statshammer.pdf' }), ref.current, {
        height: 'unset',
      })
    }
  }, [doc, ref])

  const classes = useStyles()
  return <div ref={ref} className={classes.docView}></div>
})

const PDF = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [doc, setDoc] = useState<jsPDF | undefined>(undefined)
  const [graphsReady, setGraphsReady] = useState(false)

  const units = useSelector(activeUnitsSelector, isEqual)
  const target = useSelector(activeTargetSelector, isEqual)
  const { pending: modifiersPending, modifiers, targetModifiers } = useSelector(
    (state: Store) => state.modifiers,
    isEqual
  )
  const comparison = useSelector((state: Store) => state.comparison, isEqual)
  const simulations = useSelector((state: Store) => state.simulations, isEqual)
  const numSimulations = useSelector((state: Store) => state.config.numSimulations)

  const nameMapping = useMemo(() => getNameMapping(units), [units])

  useEffect(() => {
    dispatch(getModifiers())
    dispatch(getSimulations({ units: units, limit: numSimulations, target }))
    dispatch(getComparison({ units: units, target }))
  }, [dispatch, numSimulations, target, units])

  const dataLoading = useMemo(() => {
    return comparison.pending || simulations.pending || modifiersPending
  }, [comparison.pending, modifiersPending, simulations.pending])

  const hasData = useMemo(() => {
    return !!(
      !dataLoading &&
      comparison.results.length &&
      simulations.results.length &&
      modifiers.length &&
      targetModifiers.length
    )
  }, [
    dataLoading,
    comparison.results.length,
    modifiers.length,
    targetModifiers.length,
    simulations.results.length,
  ])

  useEffect(() => {
    if (!doc && hasData && graphsReady) {
      generatePdf({
        units,
        target,
        modifierDefinitions: modifiers,
        targetModifierDefinitions: targetModifiers,
        nameMapping,
        comparisonResults: comparison.results,
        simulationResults: simulations.results,
      }).then(data => {
        setDoc(data)
      })
    }
  }, [
    comparison.results,
    doc,
    graphsReady,
    hasData,
    modifiers,
    nameMapping,
    simulations.results,
    target,
    targetModifiers,
    units,
  ])

  const handleSetGraphsReady = useCallback(() => {
    setGraphsReady(true)
  }, [])

  return (
    <div className={classes.pdfContainer}>
      {doc ? (
        <DocView doc={doc} />
      ) : (
        <>
          <Loader dataLoading={dataLoading} hasData={hasData} graphsReady={graphsReady} />
          <div className={classes.pdfGenerator}>
            <div className={classes.hidden}>
              {hasData && !doc && (
                <PdfGraphs
                  nameMapping={nameMapping}
                  comparisonResults={comparison.results}
                  simulationResults={simulations.results}
                  onRenderedCallback={handleSetGraphsReady}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PDF
