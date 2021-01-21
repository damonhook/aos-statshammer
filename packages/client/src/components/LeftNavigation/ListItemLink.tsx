import { ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

interface ListItemLinkProps {
  primary: string
  to: string
  icon: React.ReactNode
  tooltip?: boolean
  selected?: boolean
  onClose?: () => void
}

const ListItemLink = ({ primary, to, icon, tooltip, selected, onClose }: ListItemLinkProps) => {
  const handleClick = () => {
    if (onClose) onClose()
  }

  return (
    <li>
      <Tooltip title={tooltip ? primary : ''} placement="right">
        <ListItem button component={Link} to={to} selected={selected} onClick={handleClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primary} />
        </ListItem>
      </Tooltip>
    </li>
  )
}

export default ListItemLink
