import { Box } from '@material-ui/core'
import humps from 'humps'
import React, { useCallback, useMemo } from 'react'
import { ModifierOption } from 'types/modifierDefinition'

import { BooleanInput, ChoiceInput, InputComponentProps,NumberInput, RollInput } from './inputs'

interface ModifierInputProps {
  option: ModifierOption
  modifierId: string
  name: string
  value: string | number | boolean
  editModifier: (id: string, key: string, value: string | number | boolean) => void
  error?: string
}

function PartialComponent<T extends ModifierOption>(
  Component: (props: InputComponentProps<T>) => React.ReactElement,
  option: T
) {
  return ({ ...props }: Omit<InputComponentProps<T>, 'option'>) => (
    <Component option={option} {...props}></Component>
  )
}

const ModifierInput = ({ option, modifierId, name, value, editModifier, error }: ModifierInputProps) => {
  const handleChange = useCallback(
    (newValue: string | number | boolean) => {
      editModifier(modifierId, name, newValue)
    },
    [editModifier, name, modifierId]
  )

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
        error,
      })}
    </Box>
  )
}

export default React.memo(ModifierInput)
