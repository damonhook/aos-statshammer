import { Button, DialogContent, DialogActions, makeStyles, Theme } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import DialogAppBar from 'components/DialogAppBar'
import React, { useCallback, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { ModifierDefinition } from 'types/modifierDefinition'
import { Modifier } from 'types/modifierInstance'
import ModifierItems from './ModifierItems'
import SideSheet from 'components/SideSheet'

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    padding: theme.spacing(1, 2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
}))

interface ModifierSelectorProps {
  hash: string
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

const ModifierSelector = ({ hash, modifiers, onConfirm }: ModifierSelectorProps) => {
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({})
  const location = useLocation()
  const history = useHistory()
  const classes = useStyles()

  const open = location.hash === hash

  const handleOpen = useCallback(() => {
    history.push(hash, { modal: true })
  }, [history, hash])

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

export default React.memo(ModifierSelector)
