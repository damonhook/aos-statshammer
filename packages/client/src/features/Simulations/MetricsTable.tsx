import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from '@material-ui/core'
import clsx from 'clsx'
import TableSkeleton from 'components/Skeletons/TableSkeleton'
import React from 'react'
import { Metric } from 'types/store/simulations'
import { NameMapping } from 'types/store/units'

interface MetricsTableProps {
  metrics?: { [id: string]: Metric }
  nameMapping: NameMapping
  loading?: boolean
  displaySave?: string
}

const useStyles = makeStyles((theme: Theme) => ({
  cell: { padding: theme.spacing(1) },
  nameCell: { flex: 1 },
}))

const MetricsTable = ({ metrics, nameMapping, loading, displaySave = '-' }: MetricsTableProps) => {
  const classes = useStyles()

  if (!metrics || loading) return <TableSkeleton rows={3} columns={3} dense includeTitle />

  return (
    <div>
      <Typography align="center" variant="h6" style={{ fontWeight: 'normal' }}>
        {`Metrics (${displaySave})`}
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={clsx(classes.cell, classes.nameCell)}>Name</TableCell>
              <TableCell className={classes.cell} align="right">
                Average
              </TableCell>
              <TableCell className={classes.cell} align="right">
                Max
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(metrics).map(([id, values]) => (
              <TableRow key={id} hover>
                <TableCell className={clsx(classes.cell, classes.nameCell)} component="th" scope="row">
                  {nameMapping[id] ?? 'Unknown'}
                </TableCell>
                <TableCell className={classes.cell} align="right">
                  {values.average}
                </TableCell>
                <TableCell className={classes.cell} align="right">
                  {values.max}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default MetricsTable
