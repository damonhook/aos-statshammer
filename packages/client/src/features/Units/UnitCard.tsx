import React, { useCallback } from 'react'
import CollapsibleCard from 'components/CollapsibleCard'
import { Box, makeStyles, Theme } from '@material-ui/core'
import Menu from 'components/Menu'
import { Unit } from 'types/store/units'
import { useDispatch } from 'react-redux'
import { unitsStore } from 'store/slices'
import { openUnitDialog } from 'features/Forms/UnitDialog/UnitDialog'
import { useHistory } from 'react-router-dom'
import WeaponProfileInfo from 'components/WeaponProfileInfo'

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  nameField: {
    marginBottom: theme.spacing(2),
  },
}))

interface UnitListControlsProps {
  unit: Unit
}

const UnitListControls = ({ unit }: UnitListControlsProps) => {
  const dispatch = useDispatch()

  const handleCopy = useCallback(() => {
    dispatch(unitsStore.actions.addUnit({ unit: { ...unit, name: `${unit.name} copy` } }))
  }, [unit, dispatch])

  const handleDelete = useCallback(() => {
    dispatch(unitsStore.actions.deleteUnit({ id: unit.id }))
  }, [unit.id, dispatch])

  return (
    <Menu
      items={[
        { name: 'Copy', onClick: handleCopy },
        { name: 'Delete', onClick: handleDelete },
        { name: 'Export', onClick: () => {} },
      ]}
    />
  )
}

interface UnitCardProps {
  unit: Unit
}

const UnitCard = ({ unit }: UnitCardProps) => {
  const classes = useStyles()
  const history = useHistory()

  const handleUnitClicked = () => {
    openUnitDialog(history, unit.id)
  }

  return (
    <CollapsibleCard title={unit.name} controls={<UnitListControls unit={unit} />}>
      <Box flex={1} style={{ maxWidth: '100%' }}>
        <div className={classes.content} onClick={handleUnitClicked}>
          {unit.weaponProfiles.map(profile => (
            <WeaponProfileInfo profile={profile} key={profile.id} />
          ))}
        </div>
      </Box>
    </CollapsibleCard>
  )
}

export default React.memo(UnitCard)
