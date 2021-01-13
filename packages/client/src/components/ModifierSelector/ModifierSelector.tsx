import { Button, DialogContent, DialogActions } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import DialogAppBar from 'components/DialogAppBar'
import React, { useCallback, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { ModifierDefinition } from 'types/modifierDefinition'
import { Modifier } from 'types/store/units'
import ModifierItems from './ModifierItems'
import SideSheet from 'components/SideSheet'

interface ModifierSelectorProps {
  modifiers: ModifierDefinition[]
  onConfirm: (m: Omit<Modifier, 'id'>[]) => void
}

function buildNewModifier(definition: ModifierDefinition) {
  const { id, options } = definition
  return {
    type: id,
    options: Object.keys(options).reduce((acc, key) => ({ ...acc, [key]: options[key].default }), {}),
  }
}

const ModifierSelector = ({ modifiers, onConfirm }: ModifierSelectorProps) => {
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({})
  const location = useLocation()
  const history = useHistory()

  const open = location.hash === '#modifiers'

  const handleOpen = useCallback(() => {
    history.push('#modifiers', { modal: true })
  }, [history])

  const handleClose = useCallback(() => {
    setSelected({})
    history.goBack()
  }, [history, setSelected])

  const handleChange = useCallback(() => {
    if (open) handleClose()
    else handleOpen()
  }, [open, handleOpen, handleClose])

  const handleConfirm = useCallback(() => {
    const newMods = Object.keys(selected)
      .filter(key => selected[key])
      .reduce<Omit<Modifier, 'id'>[]>((acc, id) => {
        const definition = modifiers.find(mod => mod.id === id)
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
      <SideSheet open={open} aria-labelledby="modifier-selector-title" onClose={handleClose} maxWidth={900}>
        <DialogAppBar title="Add Modifiers" onClose={handleClose} id="modifier-selector-title" />
        <DialogContent>
          <ModifierItems modifiers={modifiers} selected={selected} setSelected={setSelected} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </SideSheet>
    </div>
  )
}

export default ModifierSelector

// === Alternate ===
// <Dialog open={open} onClose={handleClose} maxWidth="md" fullScreen={isMobile} scroll="paper" fullWidth>
//   <DialogAppBar title="Add Modifiers" onClose={handleClose} />
//   <DialogContent>
//     <ModifierItems modifiers={modifiers} selected={selected} setSelected={setSelected} />
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={handleClose}>Cancel</Button>
//     <Button onClick={handleConfirm}>Confirm</Button>
//   </DialogActions>
// </Dialog>
