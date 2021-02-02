import { Box, makeStyles, Theme } from '@material-ui/core'
import CollapsibleCard from 'components/CollapsibleCard'
import WeaponProfileInfo from 'components/WeaponProfileInfo'
import { openUnitDialog } from 'features/Forms/UnitDialog/UnitDialog'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { unitsStore } from 'store/slices'
import { Unit } from 'types/store/units'

import UnitControls from './UnitControls'

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  nameField: {
    marginBottom: theme.spacing(2),
  },
}))

interface UnitCardProps {
  unit: Unit
  index: number
}

const UnitCard = ({ unit, index }: UnitCardProps) => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const handleUnitClicked = () => {
    openUnitDialog(history, unit.id)
  }

  const handleProfileEnabledChanged = useCallback(
    (id: string) => (newValue: boolean) => {
      dispatch(
        unitsStore.actions.editWeaponProfile({ unitId: unit.id, id, newProfile: { disabled: !newValue } })
      )
    },
    [unit.id, dispatch]
  )

  return (
    <CollapsibleCard title={unit.name} controls={<UnitControls unit={unit} index={index} />} hover>
      <Box flex={1} style={{ maxWidth: '100%' }}>
        <div className={classes.content} onClick={handleUnitClicked}>
          {unit.weaponProfiles.map(profile => (
            <WeaponProfileInfo
              profile={profile}
              key={profile.id}
              onEnabledChanged={handleProfileEnabledChanged(profile.id)}
            />
          ))}
        </div>
      </Box>
    </CollapsibleCard>
  )
}

export default React.memo(UnitCard)
