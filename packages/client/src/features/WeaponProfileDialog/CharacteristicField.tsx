import { TextField, Grid, InputAdornment } from '@material-ui/core'
import React, { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { profileFormStore, unitsStore } from 'store/slices'
import { ProfileFormData } from 'types/store/profileForm'

interface FieldConfig {
  label: string
  type: 'number' | 'dice' | 'roll'
  startAdornment?: string
  endAdornment?: string
}

type FieldConfigLookup = {
  [key in keyof Omit<ProfileFormData, 'modifiers'>]: FieldConfig
}

const fieldConfigLookup: FieldConfigLookup = {
  numModels: { label: '# Models', type: 'number' },
  attacks: { label: 'Attacks', type: 'dice' },
  toHit: { label: 'To Hit', type: 'roll', endAdornment: '+' },
  toWound: { label: 'To Wound', type: 'roll', endAdornment: '+' },
  rend: { label: 'Rend', type: 'number', startAdornment: '-' },
  damage: { label: 'Damage', type: 'dice' },
}

interface CharacteristicFieldProps {
  data: ProfileFormData
  characteristic: keyof Omit<ProfileFormData, 'modifiers'>
}

const CharacteristicField = ({ data, characteristic }: CharacteristicFieldProps) => {
  const dispatch = useDispatch()

  const config = useMemo(() => fieldConfigLookup[characteristic], [characteristic])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let value: string | number = event.target.value
      if (config.type === 'number') value = Number(value)
      dispatch(profileFormStore.actions.editData({ key: characteristic, value }))
    },
    [dispatch, config, characteristic]
  )

  return (
    <Grid item xs={4} sm={4} md={12}>
      <TextField
        fullWidth
        variant="outlined"
        label={config.label}
        type={config.type === 'number' ? 'number' : undefined}
        name={characteristic}
        value={data[characteristic]}
        onChange={handleChange}
        InputProps={{
          startAdornment: config.startAdornment && (
            <InputAdornment position="start">{config.startAdornment}</InputAdornment>
          ),
          endAdornment: config.endAdornment && (
            <InputAdornment position="end">{config.endAdornment}</InputAdornment>
          ),
        }}
      />
    </Grid>
  )
}

export default CharacteristicField
