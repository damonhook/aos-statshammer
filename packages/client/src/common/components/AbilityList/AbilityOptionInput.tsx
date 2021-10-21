import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  MenuItem,
  TextField,
} from '@mui/material'
import {
  AbilityOption,
  BooleanOption,
  ChoiceOption,
  NumberOption,
  RollOption,
} from 'common/types/abilityDefinition'
import React from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'

interface OptionInputProps<
  TOption extends AbilityOption,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName
  label?: string
  control: Control<TFieldValues>
  option: TOption
}

const ChoiceOptionInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: OptionInputProps<ChoiceOption, TFieldValues, TName>
) => {
  const { control, name, label, option } = props
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
        <TextField
          label={label}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          error={invalid}
          helperText={error && error.message}
          select
          fullWidth
        >
          {option.items.map(item => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  )
}

const RollOptionInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: OptionInputProps<RollOption, TFieldValues, TName>
) => {
  const { control, name, label } = props
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
        <TextField
          label={label}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          error={invalid}
          helperText={error && error.message}
          InputProps={{
            endAdornment: <InputAdornment position="end">+</InputAdornment>,
          }}
          fullWidth
          required
        />
      )}
    />
  )
}

const NumberOptionInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: OptionInputProps<NumberOption, TFieldValues, TName>
) => {
  const { control, name, label } = props
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
        <TextField
          label={label}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          error={invalid}
          helperText={error && error.message}
          fullWidth
          required
        />
      )}
    />
  )
}

const BooleanOptionInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: OptionInputProps<BooleanOption, TFieldValues, TName>
) => {
  const { control, name, label } = props
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
        <FormControl error={invalid} fullWidth required>
          <FormControlLabel
            label={label ?? ''}
            control={<Checkbox value={value ?? ''} onChange={onChange} onBlur={onBlur} />}
          />
          {error && error.message && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}

const DefaultOptionInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: OptionInputProps<AbilityOption, TFieldValues, TName>
) => {
  const { control, name } = props
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
        <TextField
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          error={invalid}
          helperText={error && error.message}
          required
        />
      )}
    />
  )
}

interface AbilityOptionInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName
  label?: string
  control: Control<TFieldValues>
  option: AbilityOption
}

const AbilityOptionInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: AbilityOptionInputProps<TFieldValues, TName>
) => {
  const { option, ...rest } = props

  switch (option.type) {
    case 'choice':
      return <ChoiceOptionInput option={option as ChoiceOption} {...rest} />
    case 'roll':
      return <RollOptionInput option={option as RollOption} {...rest} />
    case 'number':
      return <NumberOptionInput option={option as NumberOption} {...rest} />
    case 'boolean':
      return <BooleanOptionInput option={option as BooleanOption} {...rest} />
    default:
      return <DefaultOptionInput option={option} {...rest} />
  }
}

export default AbilityOptionInput
