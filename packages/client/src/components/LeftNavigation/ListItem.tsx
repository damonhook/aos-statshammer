import { ListItem as MuiListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core'
import React from 'react'

interface ListItemProps {
  primary: string
  onClick: () => void
  icon: React.ReactNode
  tooltip?: boolean
  selected?: boolean
}

const ListItem = ({ primary, onClick, icon, tooltip, selected }: ListItemProps) => {
  return (
    <li>
      <Tooltip title={tooltip ? primary : ''} placement="right">
        <MuiListItem button onClick={onClick} selected={selected}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primary} />
        </MuiListItem>
      </Tooltip>
    </li>
  )
}

export default ListItem
