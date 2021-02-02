import { Box } from '@material-ui/core'
import ModifierList from 'components/ModifierList'
import ModifierSelector from 'components/ModifierSelector'
import NoItemsCard from 'components/NoItemsCard'
import { helpSelectors } from 'help/unitsHelp'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { targetStore } from 'store/slices'
import { Modifier } from 'types/modifierInstance'
import Store from 'types/store'
import { HASH_ROUTES } from 'utils/routes'

const Target = () => {
  const definitions = useSelector((state: Store) => state.modifiers.targetModifiers)
  const { modifiers, errors } = useSelector((state: Store) => state.target)
  const dispatch = useDispatch()

  const handleAddModifiers = useCallback(
    (newModifiers: Omit<Modifier, 'id'>[]) => {
      dispatch(targetStore.actions.addModifiers({ modifiers: newModifiers }))
    },
    [dispatch]
  )

  const handleEditModifier = useCallback(
    (id: string, key: string, value: string | number | boolean) => {
      dispatch(targetStore.actions.editModifierOption({ id, key, value }))
    },
    [dispatch]
  )

  const handleDeleteModifier = useCallback(
    (id: string) => {
      dispatch(targetStore.actions.deleteModifier({ id }))
    },
    [dispatch]
  )

  const handleModifierEnabledChanged = useCallback(
    (id: string, newValue: boolean) => {
      dispatch(targetStore.actions.setModifierDisabled({ id, disabled: !newValue }))
    },
    [dispatch]
  )

  const handleMoveModifier = useCallback(
    (index: number, newIndex: number) => {
      dispatch(targetStore.actions.moveModifier({ index, newIndex }))
    },
    [dispatch]
  )

  return (
    <div>
      {modifiers && modifiers.length ? (
        <ModifierList
          definitions={definitions}
          modifiers={modifiers}
          addModifiers={handleAddModifiers}
          editModifier={handleEditModifier}
          deleteModifier={handleDeleteModifier}
          onEnabledChanged={handleModifierEnabledChanged}
          moveModifier={handleMoveModifier}
          errors={errors?.modifiers}
        />
      ) : (
        <NoItemsCard title="No modifiers" description="No target modifiers are present (Basic target)" />
      )}
      <Box paddingTop={2}>
        <div id={helpSelectors.ids.addTargetModifiers}>
          <ModifierSelector
            modifiers={definitions}
            onConfirm={handleAddModifiers}
            hash={HASH_ROUTES.TARGET_MODIFIERS}
          />
        </div>
      </Box>
    </div>
  )
}

export default React.memo(Target)
