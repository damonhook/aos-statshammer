import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Slider,
  Theme,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { configStore } from 'store/slices'
import Store from 'types/store'

const useStyles = makeStyles((theme: Theme) => ({
  slider: {
    marginTop: theme.spacing(5),
    display: 'flex',
  },
}))

interface SimulationControlsProps {
  loading?: boolean
}

const SimulationControls = ({ loading }: SimulationControlsProps) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(5000)
  const numSimulations = useSelector((state: Store) => state.config.numSimulations)
  const dispatch = useDispatch()

  useEffect(() => {
    setValue(numSimulations)
  }, [numSimulations, open])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleConfirm = () => {
    dispatch(configStore.actions.setNumSimulations({ newValue: value }))
    setOpen(false)
  }

  const handleChange = (event: React.ChangeEvent<any>, newValue: number | number[]) => {
    setValue(newValue as number)
  }

  return (
    <>
      <Button disabled={!!loading} onClick={handleOpen}>
        # Simulations: {numSimulations}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Simulations Configuration</DialogTitle>
        <DialogContent>
          Customize the number of simulations used (per save). Lower simulation counts may result in less
          accurate results, while Higher simulation counts may result in longer load times
          <div className={classes.slider}>
            <Slider
              value={value}
              onChange={handleChange}
              step={1000}
              min={3000}
              max={10000}
              valueLabelDisplay="auto"
              marks={[{ value: 5000, label: 'Default' }]}
            />
            <Typography style={{ marginLeft: 24 }}>{value}</Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SimulationControls
