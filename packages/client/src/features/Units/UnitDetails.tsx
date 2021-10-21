import { yupResolver } from '@hookform/resolvers/yup'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Fab, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import routes, { useRouteParams } from 'app/routes'
import Breadcrumbs, { BreadcrumbsProps } from 'common/components/Breadcrumbs'
import { FormActions, TextInput } from 'common/components/Form'
import NoItemsCard from 'common/components/NoItemsCard'
import { unitSchema } from 'common/schema/unit'
import type { UnitData, WeaponData } from 'common/types/unit'
import { nanoid } from 'nanoid'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'

import { createUnit, editUnit } from './unitsSlice'
import WeaponCard from './WeaponCard'
import { CreateWeapon, EditWeapon } from './WeaponDetails'

interface EditableWeaponCard {
  weapon: WeaponData
  index: number
}

const EditableWeaponCard = ({ weapon, index }: EditableWeaponCard) => {
  const history = useHistory()
  const { url } = useRouteMatch()

  const handleEdit = () => {
    history.push(`${url}/${routes.EDIT_WEAPON.make({ weaponId: index })}`)
  }

  return <WeaponCard weapon={weapon} onClick={handleEdit} />
}

interface UnitDetailsProps {
  title: string
  onSubmit: (data: UnitData) => void
  initialValues?: Partial<UnitData>
  breadcrumbs?: BreadcrumbsProps['items']
}

const UnitDetails = ({ title, onSubmit, initialValues, breadcrumbs }: UnitDetailsProps) => {
  const history = useHistory()
  const { url } = useRouteMatch()

  const { control, handleSubmit } = useForm<UnitData>({
    resolver: yupResolver(unitSchema),
    defaultValues: initialValues,
    mode: 'all',
  })
  const {
    fields: weapons,
    append: appendWeapon,
    update: updateWeapon,
  } = useFieldArray({ control, name: 'weapons' })

  const handleCancel = () => {
    history.replace(routes.UNITS.make())
  }

  const handleAddWeapon = (data: WeaponData) => {
    appendWeapon({ id: nanoid(), ...data })
  }

  const handleEditWeapon = (index: number, data: WeaponData) => {
    updateWeapon(index, data)
  }

  const createWeaponPath = `${url}/${routes.CREATE_WEAPON.rule}`
  const editWeaponPath = `${url}/${routes.EDIT_WEAPON.rule}`

  return (
    <React.Fragment>
      <Switch>
        <Route path={createWeaponPath}>
          <CreateWeapon createWeapon={handleAddWeapon} baseBreadcrumbs={breadcrumbs} />
        </Route>
        <Route path={editWeaponPath}>
          <EditWeapon weapons={weapons} editWeapon={handleEditWeapon} baseBreadcrumbs={breadcrumbs} />
        </Route>
        <Route>
          <Box>
            <Typography variant="h6">{title}</Typography>
            {breadcrumbs && (
              <Box sx={{ mb: 2 }}>
                <Breadcrumbs items={breadcrumbs} />
              </Box>
            )}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextInput name="name" label="Unit Name" control={control} required />
                <Box component="span" sx={{ mt: 2 }}>
                  <Typography sx={{ mb: 2 }}>Weapons</Typography>
                  {weapons && weapons.length ? (
                    weapons.map((weapon, index) => (
                      <EditableWeaponCard key={weapon.id} weapon={weapon} index={index} />
                    ))
                  ) : (
                    <NoItemsCard
                      title="This unit is rather weak"
                      description="There are no weapon profiles here, try adding some"
                    />
                  )}
                </Box>
                <Button component={RouterLink} to={createWeaponPath} variant="contained">
                  Add Weapon
                </Button>
              </Box>
              <FormActions onCancel={handleCancel} onSubmit={handleSubmit(onSubmit)} />
            </form>
            <Fab color="primary" aria-label="add" component={RouterLink} to={createWeaponPath}>
              <AddIcon />
            </Fab>
          </Box>
        </Route>
      </Switch>
    </React.Fragment>
  )
}

export const CreateUnit = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()

  const onSubmit = (data: UnitData) => {
    dispatch(createUnit({ data }))
    history.replace(routes.UNITS.make())
  }

  return (
    <UnitDetails
      title="Create Unit"
      onSubmit={onSubmit}
      breadcrumbs={[
        {
          name: routes.UNITS.name,
          href: routes.UNITS.make(),
        },
        {
          name: routes.CREATE_UNIT.name,
          href: routes.CREATE_UNIT.make(),
        },
      ]}
    />
  )
}

export const EditUnit = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const { unitId } = useRouteParams(routes.EDIT_UNIT)

  const unit = useAppSelector(state => state.units.items.find(u => u.id === unitId))

  const onSubmit = (data: UnitData) => {
    dispatch(editUnit({ id: unitId, data }))
    history.replace(routes.UNITS.make())
  }

  return (
    <UnitDetails
      title="Edit Unit"
      onSubmit={onSubmit}
      initialValues={unit}
      breadcrumbs={[
        {
          name: routes.UNITS.name,
          href: routes.UNITS.make(),
        },
        {
          name: routes.EDIT_UNIT.name,
          href: routes.EDIT_UNIT.make({ unitId: unitId }),
        },
      ]}
    />
  )
}
