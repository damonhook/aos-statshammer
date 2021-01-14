import React, { useCallback, useState } from 'react'
import {
  Box,
  Checkbox,
  TableBody,
  TableHead,
  Table,
  TableContainer,
  TableRow,
  Typography,
  makeStyles,
  Theme,
  Paper,
} from '@material-ui/core'
import clsx from 'clsx'
import { WeaponProfile } from 'types/store/units'
import StyledTableCell from './StyledTableCell'
import ModifierSummary from './ModifierSummary'

const useStyles = makeStyles((theme: Theme) => ({
  root: { margin: theme.spacing(0, 0, 2) },
  weaponProfile: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
  disabled: { color: theme.palette.action.disabled },
}))

interface WeaponProfileInfoProps {
  profile: WeaponProfile
  onClick?: () => void
  controls?: React.ReactNode
}

const WeaponProfileInfo = ({ profile, onClick, controls }: WeaponProfileInfoProps) => {
  const [enabled, setEnabled] = useState(true)
  const classes = useStyles()

  const name = undefined
  const { numModels, attacks, toHit, toWound, rend, damage } = profile

  const handleEnabledChange = (event: React.MouseEvent<{}>) => {
    event.stopPropagation()
    setEnabled(!enabled)
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
                checked={enabled}
                onClick={handleEnabledChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
                // size="small"
              />
              <Typography
                variant="body1"
                style={{ flex: 1, textAlign: 'left' }}
                className={clsx({ [classes.disabled]: !enabled })}
              >
                {/* <strong>{name || 'Weapon Profile'}</strong> */}
                {name || 'Weapon Profile'}
              </Typography>
              {controls}
            </span>
            <TableContainer>
              <Table size="small" padding="none">
                <TableHead>
                  <TableRow>
                    <StyledTableCell disabled={!enabled}>Models</StyledTableCell>
                    <StyledTableCell disabled={!enabled}>Attacks</StyledTableCell>
                    <StyledTableCell disabled={!enabled}>To Hit</StyledTableCell>
                    <StyledTableCell disabled={!enabled}>To Wound</StyledTableCell>
                    <StyledTableCell disabled={!enabled}>Rend</StyledTableCell>
                    <StyledTableCell disabled={!enabled}>Damage</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <StyledTableCell disabled={!enabled}>{numModels}</StyledTableCell>
                    <StyledTableCell disabled={!enabled}>{attacks}</StyledTableCell>
                    <StyledTableCell disabled={!enabled}>{toHit}+</StyledTableCell>
                    <StyledTableCell disabled={!enabled}>{toWound}+</StyledTableCell>
                    <StyledTableCell disabled={!enabled}>{rend ? `-${rend}` : 0}</StyledTableCell>
                    <StyledTableCell disabled={!enabled}>{damage}</StyledTableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <ModifierSummary modifiers={profile.modifiers} />
          </Paper>
        </Box>
      </div>
    </div>
  )
}

export default WeaponProfileInfo
