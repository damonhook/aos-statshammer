// eslint-disable react/no-array-index-key
import { Box,Table, TableCell, TableRow } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'

interface TableSkeletonProps {
  rows?: number
  columns?: number
  dense?: boolean
  hover?: boolean
}

const TableSkeleton = ({ rows = 5, columns = 3, dense = false, hover = false }: TableSkeletonProps) => {
  return (
    <Box flex={1}>
      <Table size={dense ? 'small' : 'medium'}>
        {[...Array(rows)].map((_a, rowIndex) => (
          <TableRow hover={hover} key={rowIndex}>
            {[...Array(columns)].map((_b, colIndex) => (
              <TableCell key={colIndex} style={{ border: 'none' }}>
                <Skeleton height={24} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </Table>
    </Box>
  )
}

export default TableSkeleton
