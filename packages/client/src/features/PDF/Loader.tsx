import {
  LinearProgress,
  makeStyles,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Theme,
  Typography,
} from '@material-ui/core'
import { LogoIcon } from 'components/Icons'
import React, { useMemo } from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  loader: {
    maxWidth: 800,
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(2),
    width: '100%',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
  },
  progress: {
    flex: 1,
    marginLeft: theme.spacing(1),
  },
}))

interface LoaderProps {
  dataLoading: boolean
  hasData: boolean
  graphsReady: boolean
}

const Loader = ({ dataLoading, hasData, graphsReady }: LoaderProps) => {
  const classes = useStyles()
  const steps = ['Initialising', 'Loading Data', 'Generating Graphs', 'Building PDF']

  const currentStep = useMemo(() => {
    if (!hasData) return !dataLoading ? 0 : 1
    else if (!graphsReady) return 2
    else return 3
  }, [dataLoading, graphsReady, hasData])

  return (
    <Paper className={classes.loader}>
      <Typography variant="h1" align="center">
        <LogoIcon color="primary" fontSize="inherit" />
      </Typography>
      <div style={{ marginBottom: 16 }}>
        <Typography variant="h4" align="center">
          Loading
        </Typography>
      </div>
      <Stepper activeStep={currentStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step}>
            <StepLabel>
              <div className={classes.step}>
                <Typography>{step}</Typography>
                {index === currentStep && <LinearProgress className={classes.progress} />}
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  )
}

export default Loader
