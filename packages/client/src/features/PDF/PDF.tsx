import { makeStyles, ThemeProvider } from '@material-ui/core'
import { getComparison } from 'api/comparison'
import { getModifiers } from 'api/modifiers'
import { getSimulations } from 'api/simulations'
import type jsPDF from 'jspdf'
import { isEqual } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeTargetSelector } from 'store/selectors/targetSelectors'
import { activeUnitsSelector } from 'store/selectors/unitsSelectors'
import { lightTheme } from 'themes'
import Store from 'types/store'
import { NameMapping, Unit } from 'types/store/units'

import generatePdf from './generator'

function getNameMapping(units: Unit[]): NameMapping {
  return units.reduce<NameMapping>((acc, { id, name }) => ({ ...acc, [id]: name }), {})
}
const useStyles = makeStyles(() => ({
  pdfContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  generatorInner: {
    flex: 1,
    display: 'flex',
  },
  pdfGenerator: {
    width: '100%',
  },
  hidden: {
    width: '100%',
    position: 'absolute',
    left: -2000,
  },
  iframe: {
    width: '100%',
    height: '100%',
  },
}))

interface DocIFrameProps {
  doc: jsPDF
}
const DocIFrame = React.memo(({ doc }: DocIFrameProps) => {
  const classes = useStyles()
  return <iframe src={doc.output('datauristring')} className={classes.iframe} />
})

const PDF = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [doc, setDoc] = useState<jsPDF | undefined>(undefined)

  const units = useSelector(activeUnitsSelector, isEqual)
  const target = useSelector(activeTargetSelector, isEqual)
  const { pending: modifiersPending, modifiers, targetModifiers } = useSelector(
    (state: Store) => state.modifiers
  )
  const comparison = useSelector((state: Store) => state.comparison)
  const simulations = useSelector((state: Store) => state.simulations)
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
    return (
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

  // TODO: Add check if `doc` is already set
  useEffect(() => {
    if (hasData) {
      generatePdf({ units, modifierDefinitions: modifiers }).then(data => {
        setDoc(data)
      })
    }
  }, [hasData, modifiers, units])

  return (
    <div className={classes.pdfContainer}>
      <div className={classes.generatorInner}>
        {doc ? (
          <DocIFrame doc={doc} />
        ) : (
          <div className={classes.pdfGenerator}>
            <ThemeProvider theme={lightTheme}>
              <div className={classes.hidden}></div>
            </ThemeProvider>
          </div>
        )}
      </div>
    </div>
  )
}

export default PDF
