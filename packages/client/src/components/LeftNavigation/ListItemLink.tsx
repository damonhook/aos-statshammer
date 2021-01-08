import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core'

interface ListItemLinkProps {
  primary: string
  to: string
  icon: React.ReactNode
  tooltip?: boolean
}

const ListItemLink = ({ primary, to, icon, tooltip = false }: ListItemLinkProps) => {
  return (
    <li>
      <Tooltip title={tooltip ? primary : ''} placement="right">
        <ListItem button component={Link} to={to}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primary} />
        </ListItem>
      </Tooltip>
    </li>
  )
}

export default ListItemLink
