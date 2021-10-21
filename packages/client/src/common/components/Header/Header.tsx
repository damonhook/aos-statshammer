import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'

import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'

const Header = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // return isMobile ? <MobileHeader /> : <DesktopHeader />
  return <MobileHeader />
}

export default Header
