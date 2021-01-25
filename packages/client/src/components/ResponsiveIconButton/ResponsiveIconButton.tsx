import { Button, ButtonProps, IconButton, Tooltip } from '@material-ui/core'
import { useIsMobile } from 'hooks'
import React from 'react'

interface ResponsiveIconButtonProps extends ButtonProps {
  text?: string
  icon: React.ReactNode
  onClick?: (event: React.MouseEvent<any>) => void
  disabled?: boolean
}

const ResponsiveIconButton = ({ text, icon, onClick, disabled }: ResponsiveIconButtonProps) => {
  const isMobile = useIsMobile()

  return !text || isMobile ? (
    <Tooltip title={text ?? ''}>
      <IconButton size="small" onClick={onClick} disabled={disabled}>
        {icon}
      </IconButton>
    </Tooltip>
  ) : (
    <Button startIcon={icon} onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  )
}

export default ResponsiveIconButton
