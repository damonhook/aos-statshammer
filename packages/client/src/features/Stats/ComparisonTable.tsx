import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
} from '@material-ui/core'
import clsx from 'clsx'
import React, { useMemo } from 'react'
import { ComparisonResult } from 'types/store/comparison'
import { NameMapping } from 'types/store/units'

interface TransposedResult {
  id: string
  values: number[]
}

function transpose(results: ComparisonResult[]): TransposedResult[] {
  const transposed: { [id: string]: number[] } = {}
  results.forEach(({ values }) => {
    Object.keys(values).forEach(id => {
      if (!transposed[id]) transposed[id] = []
      transposed[id].push(values[id])
    })
  })
  return Object.keys(transposed).map(id => ({ id, values: transposed[id] }))
}

const useStyles = makeStyles((theme: Theme) => ({
  cell: { padding: theme.spacing(1) },
  nameCell: { flex: 1 },
  valueCell: {},
}))

interface ComparisonTableProps {
  nameMapping: NameMapping
  results: ComparisonResult[]
}

const ComparisonTable = ({ nameMapping, results }: ComparisonTableProps) => {
  const classes = useStyles()
  const data = useMemo(() => transpose(results), [results])

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell className={clsx(classes.cell, classes.nameCell)}>Unit</TableCell>
            {results.map(({ displaySave }) => (
              <TableCell align="right" className={clsx(classes.cell, classes.valueCell)}>
                {displaySave}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ id, values }) => (
            <TableRow hover>
              <TableCell className={clsx(classes.cell, classes.nameCell)} component="th" scope="row">
                {nameMapping[id] ?? 'Unknown'}
              </TableCell>
              {values.map(value => (
                <TableCell align="right" className={clsx(classes.cell, classes.valueCell)}>
                  {value.toFixed(2)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default React.memo(ComparisonTable)
