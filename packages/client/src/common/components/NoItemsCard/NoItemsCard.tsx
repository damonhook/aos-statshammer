import { Alert, AlertColor, AlertTitle, Paper } from '@mui/material'
import React from 'react'

interface NewItemsCardProps {
  title?: string
  description?: string
}

const DEFAULT_TITLE = 'No Items'

const NewItemsCard = ({ title = DEFAULT_TITLE, description }: NewItemsCardProps) => {
  return (
    <Paper elevation={0}>
      {description ? (
        <Alert
          severity="info"
          variant="outlined"
          // sx={{
          //   '& > .MuiAlert-icon': {
          //     alignItems: 'center',
          //     '& > .MuiSvgIcon-root': {
          //       sm: {
          //         width: '1.5em',
          //         height: '1.5em',
          //       },
          //     },
          //   },
          // }}
        >
          <AlertTitle>{title}</AlertTitle>
          {description}
        </Alert>
      ) : (
        <Alert severity="info" variant="outlined">
          {title}
        </Alert>
      )}
    </Paper>
  )
}

export default NewItemsCard
