import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import React from 'react'

interface ContextMenuItemProps {
  name: string
  onClose: (event: React.MouseEvent<HTMLElement>) => void
  onClick: () => void
  icon?: React.ReactNode
  disabled?: boolean
}

const ContextMenuItem = ({ name, onClose, onClick, icon, disabled }: ContextMenuItemProps) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    onClose(event)
    onClick()
  }

  return (
    <MenuItem onClick={handleClick}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText>{name}</ListItemText>
    </MenuItem>
  )
}

export interface ContextMenuProps {
  items: {
    name: string
    onClick: () => void
    icon?: React.ReactNode
    disabled?: boolean
  }[]
}

const ContextMenu = ({ items }: ContextMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = !!anchorEl

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    event.stopPropagation()
  }
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null)
    event.stopPropagation()
  }

  return (
    <Box>
      <IconButton onClick={handleOpen} size="small">
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items.map(({ name, onClick, icon, disabled }) => (
          <ContextMenuItem
            key={name}
            name={name}
            icon={icon}
            onClick={onClick}
            onClose={handleClose}
            disabled={disabled}
          />
        ))}
      </Menu>
    </Box>
  )
}

export default ContextMenu
