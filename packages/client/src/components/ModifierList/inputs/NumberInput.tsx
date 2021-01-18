import React from 'react'
import { TextField } from '@material-ui/core'
import { NumberOption } from 'types/modifierDefinition'
import { InputComponentProps } from './types'

type NumberInputProps = InputComponentProps<NumberOption>

const NumberInput = ({ name, value, onChange, error }: NumberInputProps) => {
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
      fullWidth
      error={!!error}
      helperText={error}
    />
  )
}

export default NumberInput
