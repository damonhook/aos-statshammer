import { Button, ButtonProps, IconButton, Tooltip } from '@material-ui/core'
import { useIsMobile } from 'hooks'
import React from 'react'

interface ResponsiveIconButtonProps extends Omit<ButtonProps, 'size' | 'startIcon'> {
  text?: string
  icon: React.ReactNode
}

const ResponsiveIconButton = ({ text, icon, ...props }: ResponsiveIconButtonProps) => {
  const isMobile = useIsMobile()

  return !text || isMobile ? (
    <Tooltip title={text ?? ''}>
      <IconButton size="small" {...props}>
        {icon}
      </IconButton>
    </Tooltip>
  ) : (
    <Button startIcon={icon} {...props}>
      {text}
    </Button>
  )
}

export default ResponsiveIconButton
