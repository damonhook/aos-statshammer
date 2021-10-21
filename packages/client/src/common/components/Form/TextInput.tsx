import type { TextFieldProps } from '@mui/material'
import { TextField } from '@mui/material'
import React from 'react'
import type { Control, ControllerProps, FieldPath, FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'

export interface TextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<TextFieldProps, 'name' | 'onChange' | 'onBlur' | 'value' | 'error'> {
  name: TName
  control: Control<TFieldValues>
  controllerProps?: Omit<ControllerProps<TFieldValues, TName>, 'name' | 'control' | 'render'>
}

const TextInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  controllerProps,
  ...rest
}: TextInputProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
        <TextField
          value={value || ''}
          onChange={onChange}
          onBlur={onBlur}
          error={invalid}
          helperText={error ? error.message : rest.helperText}
          {...rest}
        />
      )}
      {...controllerProps}
    />
  )
}

export default TextInput
