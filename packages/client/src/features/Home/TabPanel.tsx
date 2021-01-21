import { Box, Typography } from '@material-ui/core'
import React from 'react'

interface TabPanelProps {
  index: any
  value: any
  dir?: string
  children?: React.ReactNode
}

const TabPanel = ({ index, value, children, ...other }: TabPanelProps) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`home-tabpanel-${index}`}
      aria-labelledby={`home-tab-${index}`}
      style={{ flexGrow: 1, maxWidth: '100vw' }}
      {...other}
    >
      <Box p={1} marginTop={1}>
        <Typography>{children}</Typography>
      </Box>
    </Typography>
  )
}

export default TabPanel
