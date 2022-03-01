import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useGetAbilitiesQuery } from 'app/services/statshammer'
import { AbilityDefinition } from 'common/types/abilityDefinition'
import { AbilitiesResponse } from 'common/types/api'
import { Ability } from 'common/types/unit'
import { humanize } from 'common/utils/stringUtils'
import { nanoid } from 'nanoid'
import React from 'react'

function buildNewAbility(definition: AbilityDefinition): Ability {
  const { id, options } = definition
  return {
    id: nanoid(),
    type: id,
    options: Object.keys(options).reduce((acc, key) => ({ ...acc, [key]: options[key].default }), {}),
  }
}

interface AbilitySelectorProps {
  variant: keyof AbilitiesResponse
  onConfirm: (data: Ability[]) => void
}

const AbilitySelector = ({ variant, onConfirm }: AbilitySelectorProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<{ [key: string]: boolean }>({})

  const { data } = useGetAbilitiesQuery()
  const abilities = React.useMemo(() => data?.[variant] ?? [], [data, variant])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSelection = (id: string) => () => {
    setSelected({ ...selected, [id]: !selected[id] })
  }

  const handleConfirm = () => {
    const newAbilities = Object.keys(selected)
      .filter(key => selected[key])
      .reduce<Ability[]>((acc, type) => {
        const definition = abilities.find(ability => ability.id === type)
        if (definition) acc.push(buildNewAbility(definition))
        return acc
      }, [])
    onConfirm(newAbilities)
    setSelected({})
    handleClose()
  }

  const handleCancel = () => {
    setSelected({})
    handleClose()
  }

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleOpen} fullWidth>
        Add Abilities
      </Button>
      <Dialog open={open} fullScreen={isMobile} maxWidth="md" fullWidth>
        <DialogTitle>Abilities</DialogTitle>
        <DialogContent sx={{ padding: 0 }}>
          <List>
            {abilities.map(ability => (
              <ListItem
                key={ability.id}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    checked={!!selected[ability.id]}
                    onChange={handleSelection(ability.id)}
                    tabIndex={-1}
                    disableRipple
                  />
                }
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleSelection(ability.id)} dense>
                  <ListItemText primary={ability.name} secondary={humanize(ability.description, true)} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default AbilitySelector
