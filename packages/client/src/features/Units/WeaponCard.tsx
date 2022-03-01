import {
  Paper,
  PaperProps,
  Stack,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { SxProps } from '@mui/system'
import AbilitySummary from 'common/components/AbilitySummary'
import type { WeaponData } from 'common/types/unit'
import React from 'react'

interface TableCellProps {
  disabled?: boolean
  header?: boolean
  children?: React.ReactNode
}

const TableCell = ({ disabled, header, children }: TableCellProps) => {
  return (
    <MuiTableCell
      align="center"
      sx={{
        ...(disabled && { color: 'text.disabled' }),
        ...(!header && { borderBottom: 'none' }),
      }}
    >
      <Typography variant="caption">{children}</Typography>
    </MuiTableCell>
  )
}

interface WeaponCardProps {
  weapon: WeaponData
  onClick?: () => void
  paperProps?: Omit<PaperProps, 'onClick' | 'sx'>
  sx?: SxProps
  controls?: React.ReactNode
}

const WeaponCard = ({ weapon, onClick, paperProps, sx, controls }: WeaponCardProps) => {
  return (
    <Paper onClick={onClick} sx={{ mb: 2, p: 2, ...sx }} {...paperProps}>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ flex: 1, textAlign: 'left', mb: 1, fontWeight: 'medium' }}>
          {weapon.name || 'Weapon'}
        </Typography>
        {controls}
      </Stack>
      <TableContainer sx={{ mb: 1 }}>
        <Table size="small" padding="none">
          <TableHead>
            <TableRow>
              <TableCell header>Models</TableCell>
              <TableCell header>Attacks</TableCell>
              <TableCell header>To Hit</TableCell>
              <TableCell header>To Wound</TableCell>
              <TableCell header>Rend</TableCell>
              <TableCell header>Damage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{weapon.numModels}</TableCell>
              <TableCell>{weapon.attacks}</TableCell>
              <TableCell>{`${weapon.toHit}+`}</TableCell>
              <TableCell>{`${weapon.toWound}+`}</TableCell>
              <TableCell>{`-${weapon.rend}`}</TableCell>
              <TableCell>{weapon.damage}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <AbilitySummary abilities={weapon.abilities} variant="weapon" />
    </Paper>
  )
}

export default WeaponCard
