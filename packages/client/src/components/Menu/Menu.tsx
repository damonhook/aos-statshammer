import { IconButton, Menu as MuiMenu, MenuItem } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import React from 'react'

type MenuItemProps = { name: string; onClick: () => void; disabled?: boolean }

interface MenuProps {
  id?: string
  items: MenuItemProps[]
}

const Menu = ({ id, items }: MenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    event.stopPropagation()
  }

  const handleClose = (event: React.MouseEvent<any>) => {
    setAnchorEl(null)
    event.stopPropagation()
  }

  const handleItemClick = (index: number) => (event: React.MouseEvent<any>) => {
    items[index].onClick()
    handleClose(event)
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
        {items.map(({ name, disabled }, index) => (
          <MenuItem onClick={handleItemClick(index)} key={name} style={{ minWidth: 120 }}>
            {name}
          </MenuItem>
        ))}
      </MuiMenu>
    </div>
  )
}

export default Menu
