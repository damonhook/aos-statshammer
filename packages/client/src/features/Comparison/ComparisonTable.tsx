import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useAppSelector } from 'app/hooks'
import { ComparisonResult } from 'common/types/api'
import { unitNameMappingSelector } from 'features/Units/selectors'
import React from 'react'

interface RowData {
  id: string
  name: string
  values: number[]
}

function transformToRowData(results: ComparisonResult[], nameMapping: { [id: string]: string }) {
  const transposed: { [id: string]: number[] } = {}
  results.forEach(({ values }) => {
    values.forEach(({ id, value }) => {
      if (!transposed[id]) transposed[id] = []
      transposed[id].push(value)
    })
  })
  return Object.keys(transposed).map<RowData>(id => ({
    id,
    name: nameMapping[id] ?? 'Unknown',
    values: transposed[id],
  }))
}

interface ComparisonTableProps {
  results: ComparisonResult[]
}

const ComparisonTable = ({ results }: ComparisonTableProps) => {
  const nameMapping = useAppSelector(unitNameMappingSelector)
  const data = React.useMemo(() => transformToRowData(results, nameMapping), [results, nameMapping])

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Unit</TableCell>
            {results.map(({ save, displaySave }) => (
              <TableCell key={save}>{displaySave}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ id, name, values }) => (
            <TableRow key={id} hover>
              <TableCell>{name}</TableCell>
              {values.map((value, index) => (
                <TableCell key={`${id}-${index}`}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ComparisonTable
