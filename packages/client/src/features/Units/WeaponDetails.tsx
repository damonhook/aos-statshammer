import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Grid, Typography } from '@mui/material'
import routes, { useRouteParams } from 'app/routes'
import { useGetAbilitiesQuery } from 'app/services/statshammer'
import AbilityList from 'common/components/AbilityList'
import AbilitySelector from 'common/components/AbilitySelector'
import AbilitySummary from 'common/components/AbilitySummary'
import Breadcrumbs, { BreadcrumbsProps } from 'common/components/Breadcrumbs'
import { FormActions, TextInput, TextInputProps } from 'common/components/Form'
import NoItemsCard from 'common/components/NoItemsCard'
import { getWeaponSchema } from 'common/schema/unit'
import type { Ability, WeaponData } from 'common/types/unit'
import React from 'react'
import { isAndroid } from 'react-device-detect'
import { Controller, FieldPath, FieldValues, FormProvider } from 'react-hook-form'
import { useFieldArray, useForm } from 'react-hook-form'
import { useHistory, useRouteMatch } from 'react-router-dom'

type WeaponCharacteristicProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<TextInputProps<TFieldValues, TName>, 'required' | 'fullWidth' | 'type'>

const WeaponCharacteristic = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: WeaponCharacteristicProps<TFieldValues, TName>
) => {
  return (
    <Grid item xs={6} sm={4} md={12}>
      <TextInput
        required
        fullWidth
        {...props}
        inputProps={isAndroid ? { inputMode: 'numeric' } : undefined}
      />
    </Grid>
  )
}

interface WeaponDetailsProps {
  title: string
  onSubmit: (data: WeaponData) => void
  initialValues?: Partial<WeaponData>
  breadcrumbs?: BreadcrumbsProps['items']
}

const WeaponDetails = ({ title, onSubmit, initialValues, breadcrumbs }: WeaponDetailsProps) => {
  const { data } = useGetAbilitiesQuery()
  const schema = React.useMemo(() => getWeaponSchema(data?.weapon ?? []), [data?.weapon])

  const history = useHistory()
  const formMethods = useForm<WeaponData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'all',
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods
  const { fields: abilities, append: appendAbility } = useFieldArray({ control, name: 'abilities' })

  const handleCancel = () => {
    history.goBack()
  }

  const handleAddAbilities = (data: Ability[]) => {
    appendAbility(data)
  }

  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      {breadcrumbs && (
        <Box sx={{ mb: 2 }}>
          <Breadcrumbs items={breadcrumbs} />
        </Box>
      )}
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            control={control}
            name="id"
            render={({ field }) => <input {...field} type="hidden" />}
          />
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12}>
              <TextInput name="name" label="Weapon Name" control={control} fullWidth />
            </Grid>
            <Grid item container spacing={2} xs={12} md={3}>
              <Grid item xs={12}>
                <Typography>Characteristics:</Typography>
              </Grid>
              <WeaponCharacteristic name="numModels" label="# Models" control={control} />
              <WeaponCharacteristic name="attacks" label="Attacks" control={control} />
              <WeaponCharacteristic name="toHit" label="To Hit" control={control} />
              <WeaponCharacteristic name="toWound" label="To Wound" control={control} />
              <WeaponCharacteristic name="rend" label="Rend" control={control} />
              <WeaponCharacteristic name="damage" label="Damage" control={control} />
            </Grid>
            <Grid item xs>
              <Typography sx={{ mb: 2 }}>Abilities:</Typography>
              <Box>
                <Box sx={{ mb: 1 }}>
                  {abilities ? (
                    <>
                      <AbilityList variant="weapon" />
                    </>
                  ) : (
                    <NoItemsCard title="No Abilities" description="This weapon has no extra abilities" />
                  )}
                </Box>
                <AbilitySelector variant="weapon" onConfirm={handleAddAbilities} />
              </Box>
            </Grid>
          </Grid>
          <p>{JSON.stringify(errors)}</p>
          <FormActions onCancel={handleCancel} onSubmit={handleSubmit(onSubmit)} />
        </form>
      </FormProvider>
    </Box>
  )
}

interface CreateWeaponProps {
  createWeapon: (data: WeaponData) => void
  baseBreadcrumbs?: BreadcrumbsProps['items']
}

export const CreateWeapon = ({ createWeapon, baseBreadcrumbs }: CreateWeaponProps) => {
  const history = useHistory()
  const { url } = useRouteMatch()

  const onSubmit = (data: WeaponData) => {
    createWeapon(data)
    history.goBack()
  }

  const breadcrumbs = React.useMemo(() => {
    if (baseBreadcrumbs) {
      return [
        ...baseBreadcrumbs,
        {
          name: routes.CREATE_WEAPON.name,
          href: url,
        },
      ]
    }
    return undefined
  }, [baseBreadcrumbs, url])

  return <WeaponDetails title="Create Weapon" onSubmit={onSubmit} breadcrumbs={breadcrumbs} />
}

interface EditWeaponProps {
  weapons: WeaponData[]
  editWeapon: (index: number, data: WeaponData) => void
  baseBreadcrumbs?: BreadcrumbsProps['items']
}

export const EditWeapon = ({ weapons, editWeapon, baseBreadcrumbs }: EditWeaponProps) => {
  const history = useHistory()
  const { url } = useRouteMatch()
  const { weaponId } = useRouteParams(routes.EDIT_WEAPON)

  const index = Number(weaponId)
  const currentWeapon = weapons[index]

  const onSubmit = (data: WeaponData) => {
    editWeapon(index, data)
    history.goBack()
  }

  const breadcrumbs = React.useMemo(() => {
    if (baseBreadcrumbs) {
      return [
        ...baseBreadcrumbs,
        {
          name: routes.EDIT_WEAPON.name,
          href: url,
        },
      ]
    }
    return undefined
  }, [baseBreadcrumbs, url])

  return (
    <WeaponDetails
      title="Edit Weapon"
      onSubmit={onSubmit}
      breadcrumbs={breadcrumbs}
      initialValues={currentWeapon}
    />
  )
}
