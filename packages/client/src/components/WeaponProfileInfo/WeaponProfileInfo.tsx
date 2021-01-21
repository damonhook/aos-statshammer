import {
  Box,
  Checkbox,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from '@material-ui/core'
import clsx from 'clsx'
import React, { useCallback } from 'react'
import { WeaponProfile } from 'types/store/units'

import ModifierSummary from './ModifierSummary'
import StyledTableCell from './StyledTableCell'

const useStyles = makeStyles((theme: Theme) => ({
  root: { margin: theme.spacing(0, 0, 2) },
  weaponProfile: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
  disabled: { color: theme.palette.action.disabled },
}))

interface WeaponProfileInfoProps {
  profile: WeaponProfile
  onClick?: () => void
  onEnabledChanged?: (val: boolean) => void
  controls?: React.ReactNode
}

const WeaponProfileInfo = ({ profile, onClick, onEnabledChanged, controls }: WeaponProfileInfoProps) => {
  const classes = useStyles()

  const { name, numModels, attacks, toHit, toWound, rend, damage } = profile

  const handleEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onEnabledChanged) onEnabledChanged(event.target.checked)
  }

  const handleProfileClicked = useCallback(() => {
    if (onClick) onClick()
  }, [onClick])

  return (
    <div className={classes.root} onClick={handleProfileClicked}>
      <div className={classes.weaponProfile}>
        <Box flex={1} maxWidth="100%">
          <Paper variant="outlined">
            <span
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Checkbox
                checked={!profile.disabled}
                onClick={event => event.stopPropagation()}
                onChange={handleEnabledChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
                disabled={!onEnabledChanged}
              />
              <Typography
                variant="body1"
                style={{ flex: 1, textAlign: 'left' }}
                className={clsx({ [classes.disabled]: profile.disabled })}
              >
                {name || 'Weapon Profile'}
              </Typography>
              {controls}
            </span>
            <TableContainer>
              <Table size="small" padding="none">
                <TableHead>
                  <TableRow>
                    <StyledTableCell disabled={profile.disabled}>Models</StyledTableCell>
                    <StyledTableCell disabled={profile.disabled}>Attacks</StyledTableCell>
                    <StyledTableCell disabled={profile.disabled}>To Hit</StyledTableCell>
                    <StyledTableCell disabled={profile.disabled}>To Wound</StyledTableCell>
                    <StyledTableCell disabled={profile.disabled}>Rend</StyledTableCell>
                    <StyledTableCell disabled={profile.disabled}>Damage</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <StyledTableCell disabled={profile.disabled}>{numModels}</StyledTableCell>
                    <StyledTableCell disabled={profile.disabled}>{attacks}</StyledTableCell>
                    <StyledTableCell disabled={profile.disabled}>{toHit}+</StyledTableCell>
                    <StyledTableCell disabled={profile.disabled}>{toWound}+</StyledTableCell>
                    <StyledTableCell disabled={profile.disabled}>{rend ? `-${rend}` : 0}</StyledTableCell>
                    <StyledTableCell disabled={profile.disabled}>{damage}</StyledTableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <div className={clsx({ [classes.disabled]: profile.disabled })}>
              <ModifierSummary modifiers={profile.modifiers} />
            </div>
          </Paper>
        </Box>
      </div>
    </div>
  )
}

export default WeaponProfileInfo
