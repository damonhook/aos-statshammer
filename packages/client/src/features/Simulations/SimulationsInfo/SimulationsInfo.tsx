import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { HASH_ROUTES } from 'utils/routes'

import Section from './Section'

const SimultaionsInfo = () => {
  const location = useLocation()
  const history = useHistory()
  const numSimulations = 5000

  const open = location.hash === HASH_ROUTES.SIM_INFO

  const handleClose = () => {
    history.goBack()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <IconButton onClick={handleClose} style={{ marginRight: 10 }} size="small">
          <Close />
        </IconButton>
        Simulations Info
      </DialogTitle>
      <DialogContent>
        <Section title="Overview">
          The simulations page runs a configurable number of simulations per save and uses the results to
          gather more advanced metrics. You can modify the number of simulations you want to perform by
          clicking on the &apos;# Simulations: x&apos; button.
          <br />
          <br />
          <Alert severity="info">
            Currently set to {numSimulations} per save (Total: {numSimulations * 6})
          </Alert>
        </Section>
        <Section title="Cumulative Probability">
          This contains a cumulative probability graph which represents either:
          <ul>
            <li>
              <strong>Normal:</strong> The % probability that the unit will inflict &lt;= x damage against a
              target with y save.
            </li>
            <li>
              <strong>Inverted:</strong> The % probability that the unit will inflict &gt;= x damage against a
              target with y save.
            </li>
          </ul>
        </Section>
        <Section title="Discrete Probability">
          This contains a discrete probability graph which represents the % probability that the unit will
          inflict <strong>exactly</strong> x damage against a target with y save.
          <br />
          <br />
          <Alert severity="info">
            Note that there will only be data points for damage numbers that the unit can possibly inflict
          </Alert>
        </Section>
        <Section title="Average Damage">
          This is a copy of the graphs visible on the Stats page for easy reference
        </Section>
        <Section title="Metrics">
          This contains sample metrics that the unit has against a target with y save:
          <ul>
            <li>Mean</li>
            <li>Max</li>
            <li>Variance</li>
            <li>Standard Deviation</li>
          </ul>
        </Section>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SimultaionsInfo
