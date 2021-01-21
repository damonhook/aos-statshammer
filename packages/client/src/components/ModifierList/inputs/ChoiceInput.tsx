import { MenuItem, TextField } from '@material-ui/core'
import React from 'react'
import { ChoiceOption } from 'types/modifierDefinition'
import { titleCase } from 'utils/helpers'

import { InputComponentProps } from './types'

type ChoiceInputProps = InputComponentProps<ChoiceOption>

const ChoiceInput = ({ option, name, value, onChange, error }: ChoiceInputProps) => {
  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    onChange(event.target.value)
  }

  return (
    <TextField
      variant="outlined"
      label={name}
      value={value ?? ''}
      onChange={handleChange}
      fullWidth
      select
      error={!!error}
      helperText={error}
    >
      {option.items.map(i => (
        <MenuItem key={i} value={i}>
          {titleCase(i.replace(/_/g, ' '))}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default ChoiceInput
