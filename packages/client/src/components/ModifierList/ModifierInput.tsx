import React, { useCallback, useMemo } from 'react'
import { Box, Checkbox, FormControlLabel, MenuItem, TextField } from '@material-ui/core'
import {
  BooleanOption,
  ChoiceOption,
  ModifierOption,
  NumberOption,
  RollOption,
} from 'types/modifierDefinition'
import { useDispatch } from 'react-redux'
import { profileFormStore } from 'store/slices'
import humps from 'humps'
import { titleCase } from 'utils/stringUtils'

interface InputComponentProps<T extends ModifierOption> {
  option: T
  name: string
  value: string | number | boolean
  onChange: (newValue: string | number | boolean) => void
}

const BooleanInput = ({ name, value, onChange }: InputComponentProps<BooleanOption>) => {
  const handleChange = (event: React.ChangeEvent<{}>) => {
    onChange(!value)
  }

  return <FormControlLabel label={name} control={<Checkbox checked={!!value} onChange={handleChange} />} />
}

const ChoiceInput = ({ option, name, value, onChange }: InputComponentProps<ChoiceOption>) => {
  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    onChange(event.target.value)
  }

  return (
    <TextField variant="outlined" label={name} value={value ?? ''} onChange={handleChange} fullWidth select>
      {option.items.map(i => (
        <MenuItem key={i} value={i}>
          {titleCase(i.replace(/_/g, ' '))}
        </MenuItem>
      ))}
    </TextField>
  )
}

const NumberInput = ({ name, value, onChange }: InputComponentProps<NumberOption>) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return <TextField variant="outlined" label={name} value={value} onChange={handleChange} fullWidth />
}

const RollInput = ({ name, value, onChange }: InputComponentProps<RollOption>) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return <TextField variant="outlined" label={name} value={value} onChange={handleChange} fullWidth />
}

interface ModifierInputProps {
  option: ModifierOption
  modifierId: string
  name: string
  value: string | number | boolean
}

const ModifierInput = ({ option, modifierId, name, value }: ModifierInputProps) => {
  const dispatch = useDispatch()

  const handleChange = useCallback(
    (newValue: string | number | boolean) => {
      dispatch(profileFormStore.actions.editModifier({ id: modifierId, key: name, value: newValue }))
    },
    [dispatch, name, modifierId]
  )

  const PartialComponent = <T extends ModifierOption>(
    Component: (props: InputComponentProps<T>) => React.ReactElement,
    option: any
  ) => ({ ...props }: Omit<InputComponentProps<T>, 'option'>) => {
    return <Component option={option} {...props}></Component>
  }

  const InputComponent = useMemo(() => {
    switch (option.type) {
      case 'boolean':
        return PartialComponent(BooleanInput, option)
      case 'choice':
        return PartialComponent(ChoiceInput, option)
      case 'roll':
        return PartialComponent(RollInput, option)
      default:
        return PartialComponent(NumberInput, option)
    }
  }, [option])

  return (
    <Box style={{ marginBottom: '10px' }}>
      {InputComponent({
        name: humps.decamelize(name, { separator: ' ' }),
        value,
        onChange: handleChange,
      })}
    </Box>
  )
}

export default React.memo(ModifierInput)
