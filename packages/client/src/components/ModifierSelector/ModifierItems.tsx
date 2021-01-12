import { List, ListItem, ListItemText, ListItemIcon, Checkbox } from '@material-ui/core'
import React from 'react'
import { ModifierDefinition } from 'types/modifierDefinition'

interface ModifierItemsProps {
  modifiers: ModifierDefinition[]
  selected: { [key: string]: boolean }
  setSelected: (newSelectors: { [key: string]: boolean }) => void
}

const ModifierItems = ({ modifiers, selected, setSelected }: ModifierItemsProps) => {
  const handleToggle = (name: string) => () => {
    setSelected({ ...selected, [name]: !selected[name] })
  }

  return (
    <List>
      {modifiers.map(({ id, name, description }) => (
        <ListItem button key={id} onClick={handleToggle(id)} role={undefined}>
          <ListItemIcon>
            <Checkbox edge="start" tabIndex={-1} disableRipple checked={!!selected[id]} />
          </ListItemIcon>
          <ListItemText primary={name} secondary={description} />
        </ListItem>
      ))}
    </List>
  )
}

export default ModifierItems
