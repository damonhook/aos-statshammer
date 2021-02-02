import { Button, DialogActions, DialogContent, List, makeStyles, Theme } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import DialogAppBar from 'components/DialogAppBar'
import SideSheet from 'components/SideSheet'
import React, { useCallback, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { ModifierDefinition } from 'types/modifierDefinition'
import { Modifier } from 'types/modifierInstance'
import { HashRoute } from 'utils/routes'

import ModifierItem from './ModifierItem'

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    padding: theme.spacing(1, 2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
}))

interface ModifierSelectorProps {
  hash: HashRoute
  modifiers: ModifierDefinition[]
  onOpen?: () => void
  onConfirm: (m: Omit<Modifier, 'id'>[]) => void
}

function buildNewModifier(definition: ModifierDefinition) {
  const { id, options } = definition
  return {
    type: id,
    options: Object.keys(options).reduce((acc, key) => ({ ...acc, [key]: options[key].default }), {}),
  }
}

const ModifierSelector = ({ hash, modifiers, onOpen, onConfirm }: ModifierSelectorProps) => {
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({})
  const location = useLocation()
  const history = useHistory()
  const classes = useStyles()

  const open = location.hash === hash

  const handleOpen = useCallback(() => {
    history.push(hash, { modal: true })
    if (onOpen) onOpen()
  }, [history, hash, onOpen])

  const handleClose = useCallback(() => {
    setSelected({})
    history.goBack()
  }, [history, setSelected])

  const handleChange = useCallback(() => {
    if (open) handleClose()
    else handleOpen()
  }, [open, handleOpen, handleClose])

  const handleSelection = (id: string) => () => {
    setSelected({ ...selected, [id]: !selected[id] })
  }

  const handleConfirm = useCallback(() => {
    const newMods = Object.keys(selected)
      .filter(key => selected[key])
      .reduce<Omit<Modifier, 'id'>[]>((acc, type) => {
        const definition = modifiers.find(mod => mod.id === type)
        if (definition) acc.push(buildNewModifier(definition))
        return acc
      }, [])
    onConfirm(newMods)
    handleClose()
  }, [modifiers, selected, handleClose, onConfirm])

  return (
    <div>
      <Button onClick={handleChange} startIcon={<Add />} fullWidth color="primary" variant="contained">
        Add Modifiers
      </Button>
      <SideSheet
        open={open}
        aria-labelledby="modifier-selector-title"
        onClose={handleClose}
        maxWidth={600}
        keepMounted
      >
        <DialogAppBar title="Add Modifiers" onClose={handleClose} id="modifier-selector-title" />
        <DialogContent classes={{ root: classes.content }}>
          <List>
            {modifiers.map(({ id, name, description }) => (
              <ModifierItem
                id={id}
                key={id}
                name={name}
                description={description}
                selected={selected[id]}
                onSelected={handleSelection(id)}
              />
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </SideSheet>
    </div>
  )
}

export default React.memo(ModifierSelector)
