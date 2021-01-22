import { ButtonProps, ListItem as MuiListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core'
import React from 'react'

interface ListItemProps extends ButtonProps {
  primary: string
  onClick?: () => void
  icon: React.ReactNode
  tooltip?: boolean
  selected?: boolean
  disabled?: boolean
}

const ListItem = ({ primary, onClick, icon, tooltip, selected, disabled }: ListItemProps) => {
  return (
    <li>
      <Tooltip title={tooltip ? primary : ''} placement="right">
        <MuiListItem button onClick={onClick} selected={selected} disabled={disabled}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primary} />
        </MuiListItem>
      </Tooltip>
    </li>
  )
}

export default ListItem
