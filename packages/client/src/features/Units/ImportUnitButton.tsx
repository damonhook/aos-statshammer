import { ImportExport } from '@material-ui/icons'
import ImportButton from 'components/ImportButton'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notificationsStore, unitsStore } from 'store/slices'
import Store from 'types/store'
import { convertUnitJson } from 'utils/exported'

const ImportUnitButton = () => {
  const definitions = useSelector((state: Store) => state.modifiers.modifiers)
  const dispatch = useDispatch()

  const handleUpload = useCallback(
    (data: any) => {
      try {
        const imported = convertUnitJson(data, definitions)
        dispatch(unitsStore.actions.addUnit({ unit: imported.unit }))
        dispatch(notificationsStore.actions.addNotification({ message: 'Successfully imported unit' }))
      } catch (err) {
        console.error(err)
        dispatch(
          notificationsStore.actions.addNotification({ message: 'Invalid data for import', variant: 'error' })
        )
      }
    },
    [dispatch, definitions]
  )

  return (
    <ImportButton
      id="import-unit-home"
      variant="contained"
      startIcon={<ImportExport />}
      color="primary"
      onImport={handleUpload}
    >
      Import
    </ImportButton>
  )
}

export default ImportUnitButton
