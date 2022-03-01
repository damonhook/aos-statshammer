import { FormControl, FormControlLabel, FormHelperText, Switch, SwitchProps } from '@mui/material'
import React from 'react'
import type { Control, ControllerProps, FieldPath, FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'

export interface SwitchInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<SwitchProps, 'onChange' | 'onBlur' | 'checked'> {
  name: TName
  label?: string
  control: Control<TFieldValues>
  controllerProps?: Omit<ControllerProps<TFieldValues, TName>, 'name' | 'control' | 'render'>
}

const SwitchInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  control,
  controllerProps,
  ...rest
}: SwitchInputProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
        <FormControl error={invalid}>
          <FormControlLabel
            label={label ?? ''}
            control={<Switch checked={value} onChange={onChange} onBlur={onBlur} {...rest} />}
          />
          {error && error.message && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}

export default SwitchInput
