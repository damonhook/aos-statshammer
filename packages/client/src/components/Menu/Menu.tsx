import { IconButton, Menu as MuiMenu, MenuProps as MuiMenuProps } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import React from 'react'

import MenuItems from './MenuItems'

export type MenuItemProps = { name: string; onClick: () => void; disabled?: boolean }

export interface MenuProps {
  id?: string
  items: MenuItemProps[]
  secondaryItems?: MenuItemProps[]
  onOpen?: () => void
}

const Menu = ({ id, items, secondaryItems, onOpen }: MenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onOpen) onOpen()
    setAnchorEl(event.currentTarget)
    event.stopPropagation()
  }

  const handleClose = (event: React.MouseEvent<any>) => {
    setAnchorEl(null)
    event.stopPropagation()
  }

  return (
    <div>
      <IconButton size="small" onClick={handleOpen} aria-controls={`menu-${id}`} aria-haspopup="true">
        <MoreVert />
      </IconButton>
      <MuiMenu
        id={`menu-${id}`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItems items={items} secondaryItems={secondaryItems} onClose={handleClose} />
      </MuiMenu>
    </div>
  )
}

export default React.memo(Menu)
