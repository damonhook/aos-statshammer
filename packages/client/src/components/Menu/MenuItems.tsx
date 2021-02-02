import { Divider, MenuItem } from '@material-ui/core'
import React from 'react'

export type MenuItemProps = { name: string; onClick: () => void; disabled?: boolean }

export interface MenuItemsProps {
  items: MenuItemProps[]
  secondaryItems?: MenuItemProps[]
  onClose: (event: React.MouseEvent<any>) => void
}

const MenuItems = ({ items, secondaryItems, onClose }: MenuItemsProps) => {
  const handleItemClick = (index: number) => (event: React.MouseEvent<any>) => {
    items[index].onClick()
    onClose(event)
  }

  const handleSecondaryItemClick = (index: number) => (event: React.MouseEvent<any>) => {
    if (secondaryItems) secondaryItems[index].onClick()
    onClose(event)
  }

  return (
    <>
      {items.map(({ name, disabled }, index) => (
        <MenuItem onClick={handleItemClick(index)} key={name} style={{ minWidth: 120 }} disabled={disabled}>
          {name}
        </MenuItem>
      ))}
      {secondaryItems && secondaryItems.length && (
        <>
          <Divider />
          {secondaryItems.map(({ name, disabled }, index) => (
            <MenuItem
              onClick={handleSecondaryItemClick(index)}
              key={name}
              style={{ minWidth: 120 }}
              disabled={disabled}
            >
              {name}
            </MenuItem>
          ))}
        </>
      )}
    </>
  )
}

export default MenuItems
