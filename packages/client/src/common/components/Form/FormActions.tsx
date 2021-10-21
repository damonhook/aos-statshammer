import { Box, Button, Divider, Fab, Stack, Typography } from '@mui/material'
import React from 'react'

export interface FormActionsProps {
  onCancel: React.MouseEventHandler<HTMLButtonElement>
  onSubmit: React.MouseEventHandler<HTMLButtonElement>
}

const FormActions = ({ onCancel, onSubmit }: FormActionsProps) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Divider />
      <Stack direction="row" spacing={1} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mb: 2 }}>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onSubmit} variant="outlined">
          Submit
        </Button>
      </Stack>
    </Box>
  )
}

export default FormActions
