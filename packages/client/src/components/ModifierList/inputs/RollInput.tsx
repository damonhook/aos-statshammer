import React from 'react'
import { InputAdornment, TextField } from '@material-ui/core'
import { RollOption } from 'types/modifierDefinition'
import { InputComponentProps } from './types'

type RollInputProps = InputComponentProps<RollOption>

const RollInput = ({ name, value, onChange, error }: RollInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const num = Number(value)
    onChange(value !== '' && !Number.isNaN(num) ? num : value)
  }

  return (
    <TextField
      variant="outlined"
      label={name}
      value={value}
      onChange={handleChange}
      type="number"
      InputProps={{
        endAdornment: <InputAdornment position="end">+</InputAdornment>,
      }}
      fullWidth
      error={!!error}
      helperText={error}
    />
  )
}

export default RollInput
