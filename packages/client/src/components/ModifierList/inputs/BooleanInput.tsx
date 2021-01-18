import React from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { BooleanOption } from 'types/modifierDefinition'
import { InputComponentProps } from './types'

type BooleanInputProps = InputComponentProps<BooleanOption>

const BooleanInput = ({ name, value, onChange }: BooleanInputProps) => {
  const handleChange = (event: React.ChangeEvent<{}>) => {
    onChange(!value)
  }

  return <FormControlLabel label={name} control={<Checkbox checked={!!value} onChange={handleChange} />} />
}

export default BooleanInput
