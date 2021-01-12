import React, { useCallback, useState } from 'react'
import {
  Box,
  Checkbox,
  TableBody,
  TableHead,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  Typography,
  makeStyles,
  Theme,
  Paper,
} from '@material-ui/core'
import clsx from 'clsx'
import Menu from 'components/Menu'
import { WeaponProfile } from 'types/store/units'
import { useDispatch } from 'react-redux'
import { unitsStore } from 'store/slices'
import { useHistory } from 'react-router-dom'
import { openProfileDialog } from '../WeaponProfileDialog'

const useStyles = makeStyles((theme: Theme) => ({
  root: { margin: theme.spacing(0, 0, 2) },
  weaponProfile: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
  disabled: { color: theme.palette.action.disabled },
}))

interface StyledTableCellProps {
  disabled?: boolean
  children?: React.ReactNode
}

const StyledTableCell = ({ disabled = false, children }: StyledTableCellProps) => {
  const classes = useStyles()

  return (
    <TableCell align="center" className={clsx({ [classes.disabled]: disabled })}>
      {children}
    </TableCell>
  )
}

interface WeaponProfileControlsProps {
  unitId: string
  profile: WeaponProfile
}

const WeaponProfileControls = ({ unitId, profile }: WeaponProfileControlsProps) => {
  const dispatch = useDispatch()

  const handleEdit = useCallback(() => {
    alert(`Unit: ${unitId}\nProfile: ${profile.id}`)
  }, [unitId, profile.id])

  const handleCopy = useCallback(() => {
    dispatch(unitsStore.actions.addWeaponProfile({ unitId, weaponProfile: profile }))
  }, [unitId, profile, dispatch])

  const handleDelete = useCallback(() => {
    dispatch(unitsStore.actions.deleteWeaponProfile({ unitId, id: profile.id }))
  }, [unitId, profile.id, dispatch])

  return (
    <Menu
      items={[
        { name: 'Edit', onClick: handleEdit },
        { name: 'Copy', onClick: handleCopy },
        { name: 'Delete', onClick: handleDelete },
      ]}
    />
  )
}

interface WeaponProfileCardProps {
  unitId: string
  profile: WeaponProfile
}

const WeaponProfileCard = ({ unitId, profile }: WeaponProfileCardProps) => {
  const [enabled, setEnabled] = useState(true)
  const classes = useStyles()
  const history = useHistory()

  const name = undefined
  const { numModels, attacks, toHit, toWound, rend, damage } = profile

  const handleEnabledChange = () => {
    setEnabled(!enabled)
  }

  const handleProfileClicked = () => {
    openProfileDialog(history, unitId, profile.id)
  }

  return (
    <Box flex={1} className={classes.root}>
      <form noValidate autoComplete="off" className={classes.weaponProfile}>
        <Box flex={1}>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small" padding="default">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <span
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Checkbox
                        checked={enabled}
                        onChange={handleEnabledChange}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        size="small"
                      />
                      <Typography
                        style={{ flex: 1 }}
                        onClick={handleEnabledChange}
                        className={clsx({ [classes.disabled]: !enabled })}
                      >
                        <strong>{name || 'Weapon Profile'}</strong>
                      </Typography>
                      <WeaponProfileControls unitId={unitId} profile={profile} />
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow onClick={handleProfileClicked}>
                  <StyledTableCell disabled={!enabled}>Models</StyledTableCell>
                  <StyledTableCell disabled={!enabled}>Attacks</StyledTableCell>
                  <StyledTableCell disabled={!enabled}>To Hit</StyledTableCell>
                  <StyledTableCell disabled={!enabled}>To Wound</StyledTableCell>
                  <StyledTableCell disabled={!enabled}>Rend</StyledTableCell>
                  <StyledTableCell disabled={!enabled}>Damage</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody onClick={handleProfileClicked}>
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
        </Box>
      </form>
    </Box>
  )
}

export default WeaponProfileCard
