import React from 'react'
import { TableCell, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) => ({
  cell: { padding: theme.spacing(1, 0.25) },
  disabled: { color: theme.palette.action.disabled },
}))

interface StyledTableCellProps {
  disabled?: boolean
  children?: React.ReactNode
}

const StyledTableCell = ({ disabled = false, children }: StyledTableCellProps) => {
  const classes = useStyles()

  return (
    <TableCell align="center" className={clsx(classes.cell, { [classes.disabled]: disabled })}>
      {children}
    </TableCell>
  )
}

export default StyledTableCell
