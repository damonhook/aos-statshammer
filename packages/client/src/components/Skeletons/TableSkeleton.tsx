// eslint-disable react/no-array-index-key
import { Box, Table, TableCell, TableRow } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'

interface TableSkeletonProps {
  rows?: number
  columns?: number
  dense?: boolean
  hover?: boolean
  includeTitle?: boolean
}

const TableSkeleton = ({ rows = 5, columns = 3, dense, hover, includeTitle }: TableSkeletonProps) => {
  return (
    <Box flex={1}>
      {includeTitle && (
        <Skeleton
          variant="text"
          height={25}
          style={{ display: 'flex', width: '50%', margin: '0 auto', marginBottom: '10px' }}
        />
      )}
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
