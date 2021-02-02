import { FormControlLabel, makeStyles, MenuItem, Switch, TextField, Theme } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uiStore } from 'store/slices'
import Store from 'types/store'
import { ReferenceLines } from 'types/store/ui'

const useStyles = makeStyles((theme: Theme) => ({
  options: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    '& > *': {
      marginRight: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(1),
      },
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
  inverted: {
    marginLeft: theme.spacing(0),
  },
  loading: {
    marginTop: '-10px',
    marginBottom: '12px',
  },
}))

export interface CollectionControlsProps {
  savesLookup: { save: number; displaySave: string }[]
  loading?: boolean
  variant: 'cumulative' | 'discrete' | 'metrics'
}

const CollectionControls = ({ savesLookup, loading, variant }: CollectionControlsProps) => {
  const classes = useStyles()
  const { save, referenceLines, inverted } = useSelector((state: Store) => state.ui.simulations)
  const dispatch = useDispatch()

  const handleSaveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(uiStore.actions.setSimulationsUI({ save: Number(event.target.value) }))
  }

  const handleReferenceLineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as keyof ReferenceLines | 'none'
    dispatch(uiStore.actions.setSimulationsUI({ referenceLines: value !== 'none' ? value : undefined }))
  }

  const handleInvertedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(uiStore.actions.setSimulationsUI({ inverted: event.target.checked }))
  }

  if (loading) return <Skeleton height={64} className={classes.loading} />

  return (
    <div className={classes.options}>
      <TextField
        select
        value={save}
        onChange={handleSaveChange}
        variant="filled"
        label="Save"
        size="small"
        fullWidth
      >
        {savesLookup.map(i => (
          <MenuItem key={i.save} value={i.save}>
            {i.displaySave}
          </MenuItem>
        ))}
      </TextField>
      {(variant === 'cumulative' || variant === 'discrete') && (
        <TextField
          select
          value={referenceLines ?? 'none'}
          onChange={handleReferenceLineChange}
          variant="filled"
          label="Reference Lines"
          size="small"
          fullWidth
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="average">Average</MenuItem>
          <MenuItem value="max">Max</MenuItem>
        </TextField>
      )}
      {variant === 'cumulative' && (
        <FormControlLabel
          value="start"
          control={<Switch color="primary" checked={inverted} onChange={handleInvertedChange} />}
          label="Inverted"
          labelPlacement="start"
          className={classes.inverted}
        />
      )}
    </div>
  )
}

export default CollectionControls
