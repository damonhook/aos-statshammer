import React, { useCallback } from 'react'
import ModifierSelector from 'components/ModifierSelector'
import { useDispatch, useSelector } from 'react-redux'
import Store from 'types/store'
import { Modifier } from 'types/modifierInstance'
import ModifierList from 'components/ModifierList'
import { HASH_ROUTES } from 'utils/routes'
import { targetStore } from 'store/slices'

const Target = () => {
  const modifiers = useSelector((state: Store) => state.modifiers.targetModifiers)
  const data: Modifier[] = useSelector((state: Store) => state.target.modifiers)
  const dispatch = useDispatch()

  const handleAddModifiers = useCallback(
    (newModifiers: Omit<Modifier, 'id'>[]) => {
      dispatch(targetStore.actions.addModifiers({ modifiers: newModifiers }))
    },
    [dispatch]
  )

  const handleEditModifier = useCallback(
    (id: string, key: string, value: string | number | boolean) => {
      dispatch(targetStore.actions.editModifier({ id, key, value }))
    },
    [dispatch]
  )

  const handleDeleteModifier = useCallback(
    (id: string) => {
      dispatch(targetStore.actions.deleteModifier({ id }))
    },
    [dispatch]
  )

  return (
    <div>
      <ModifierList
        definitions={modifiers}
        modifiers={data}
        addModifiers={handleAddModifiers}
        editModifier={handleEditModifier}
        deleteModifier={handleDeleteModifier}
      />
      <ModifierSelector
        modifiers={modifiers}
        onConfirm={handleAddModifiers}
        hash={HASH_ROUTES.TARGET_MODIFIERS}
      />
    </div>
  )
}

export default React.memo(Target)
