import { Breadcrumbs, Button, Divider, Link, makeStyles, Theme, Typography } from '@material-ui/core'
import { ImportExport, Save } from '@material-ui/icons'
import ImportButton from 'components/ImportButton'
import { nanoid } from 'nanoid'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { unitFormStore } from 'store/slices/forms'
import Store from 'types/store'
import { convertUnitJson } from 'utils/exported'
import { PAGE_ROUTES } from 'utils/routes'

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    marginBottom: theme.spacing(3),
  },
  items: {
    display: 'flex',
    marginBottom: theme.spacing(1),
    justifyContent: 'flex-end',
    alignItems: 'center',

    '& > *': {
      marginRight: theme.spacing(1),
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
  breadcrumbs: {
    flex: 1,
    [theme.breakpoints.down(350)]: {
      display: 'none',
    },
  },
}))

const UnitToolBar = () => {
  const classes = useStyles()
  const definitions = useSelector((state: Store) => state.modifiers.modifiers)
  const history = useHistory()
  const dispatch = useDispatch()

  const onHomeClick = (event: React.MouseEvent<any>) => {
    event.preventDefault()
    history.goBack()
  }

  const handleUpload = useCallback(
    (data: any) => {
      try {
        const imported = convertUnitJson(data, definitions)
        // Add `id` to weapon profiles
        const unit = {
          ...imported.unit,
          weaponProfiles: imported.unit.weaponProfiles.map(p => ({ ...p, id: nanoid() })),
        }
        console.log(unit)
        dispatch(unitFormStore.actions.initForm({ unit }))
      } catch (err) {
        console.error(err)
      }
    },
    [dispatch, definitions]
  )

  return (
    <div className={classes.toolbar}>
      <div className={classes.items}>
        <div className={classes.breadcrumbs}>
          <Breadcrumbs>
            <Link color="inherit" href={PAGE_ROUTES.HOME} onClick={onHomeClick}>
              Home
            </Link>
            <Typography color="textPrimary">Edit Unit</Typography>
          </Breadcrumbs>
        </div>
        <ImportButton
          id="import-unit-dialog"
          startIcon={<ImportExport />}
          onImport={handleUpload}
          size="small"
        >
          Import
        </ImportButton>
        <Button startIcon={<Save />} size="small">
          Export
        </Button>
      </div>
      <Divider />
    </div>
  )
}

export default UnitToolBar
