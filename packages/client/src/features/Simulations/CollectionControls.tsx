import { FormControlLabel, makeStyles, MenuItem, Switch, TextField, Theme } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'
import { Metric } from 'types/store/simulations'

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
  save: number
  referenceLine?: string
  inverted: boolean
  onSaveChange: (val: number) => void
  onReferenceLineChange: (val?: keyof Metric) => void
  onInvertedChange: (val: boolean) => void
}

const CollectionControls = ({
  savesLookup,
  loading,
  variant,
  save,
  referenceLine,
  inverted,
  onSaveChange,
  onReferenceLineChange,
  onInvertedChange,
}: CollectionControlsProps) => {
  const classes = useStyles()

  const handleSaveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSaveChange(Number(event.target.value))
  }

  const handleReferenceLineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as keyof Metric | 'none' | undefined
    onReferenceLineChange(value !== 'none' ? value : undefined)
  }

  const handleInvertedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInvertedChange(event.target.checked)
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
          value={referenceLine ?? 'none'}
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
