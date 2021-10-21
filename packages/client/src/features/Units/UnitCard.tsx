import { Box } from '@mui/system'
import routes from 'app/routes'
import CollapsibleCard from 'common/components/CollapsibleCard'
import NoItemsCard from 'common/components/NoItemsCard'
import type { Unit } from 'common/types/unit'
import React from 'react'
import { useHistory } from 'react-router-dom'

import WeaponCard from './WeaponCard'

interface UnitCardProps {
  unit: Unit
  index: number
}

const UnitCard = ({ unit, index }: UnitCardProps) => {
  const history = useHistory()

  const handleEditUnit = () => {
    history.push(routes.EDIT_UNIT.make({ unitId: unit.id }))
  }

  return (
    <Box sx={{ display: 'flex', maxWidth: '100%', flexDirection: 'column' }}>
      <CollapsibleCard title={unit.name}>
        <Box onClick={handleEditUnit}>
          {unit.weapons && unit.weapons.length ? (
            unit.weapons.map(weapon => (
              <WeaponCard
                key={weapon.id}
                weapon={weapon}
                paperProps={{ variant: 'outlined' }}
                sx={{
                  p: { xs: 1, md: 2 },
                }}
              />
            ))
          ) : (
            <NoItemsCard title="This unit has no weapons" />
          )}
        </Box>
      </CollapsibleCard>
    </Box>
  )
}

export default UnitCard
