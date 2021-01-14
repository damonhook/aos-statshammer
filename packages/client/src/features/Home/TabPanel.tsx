import React from 'react'
import { Box, Typography } from '@material-ui/core'

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
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
