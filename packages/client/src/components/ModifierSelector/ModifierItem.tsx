import { Checkbox, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import humps from 'humps'
import React, { useMemo } from 'react'
import { startWithUppercase } from 'utils/helpers'

interface ModifierItemProps {
  id: string
  name: string
  description: string
  onSelected: () => void
  selected?: boolean
}

const ModifierItem = ({ id, name, description, onSelected, selected }: ModifierItemProps) => {
  const handleToggle = () => onSelected()

  const displayDescription = useMemo(
    () => startWithUppercase(humps.decamelize(description, { separator: ' ' })),
    [description]
  )

  return (
    <ListItem button key={id} onClick={handleToggle} role={undefined}>
      <ListItemIcon>
        <Checkbox edge="start" tabIndex={-1} disableRipple checked={!!selected} />
      </ListItemIcon>
      <ListItemText primary={name} secondary={displayDescription} />
    </ListItem>
  )
}

export default ModifierItem
