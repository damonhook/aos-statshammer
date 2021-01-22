import { Button, IconButton, Tooltip } from '@material-ui/core'
import { useIsMobile } from 'hooks'
import React from 'react'

interface ResponsiveIconButtonProps {
  text?: string
  icon: React.ReactNode
  onClick?: (event: React.MouseEvent<any>) => void
}

const ResponsiveIconButton = ({ text, icon, onClick }: ResponsiveIconButtonProps) => {
  const isMobile = useIsMobile()

  return !text || isMobile ? (
    <Tooltip title={text ?? ''}>
      <IconButton size="small" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  ) : (
    <Button startIcon={icon} onClick={onClick}>
      {text}
    </Button>
  )
}

export default ResponsiveIconButton
