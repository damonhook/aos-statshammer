import { Badge, Box, Button, IconButton, makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import { ArrowBack, ArrowForward, Close, FirstPage } from '@material-ui/icons'
import React from 'react'
import { Controls, CustomHelperProps } from 'reactour'

import TourGuideDots from './TourGuideDots'

const useStyles = makeStyles((theme: Theme) => ({
  helper: {
    maxWidth: 500,
    width: 'calc(100vw - 10px)',
    padding: 10,
  },
  inner: {
    width: '100%',
  },
  close: {
    top: 2,
    right: 2,
    position: 'absolute',
  },
  content: {
    padding: theme.spacing(1),
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

const TourGuideHelper = ({ current, content, totalSteps, gotoStep, close }: CustomHelperProps) => {
  const classes = useStyles()

  const handleReset = () => gotoStep(0)
  const handleNext = () => gotoStep(current + 1)
  const handlePrevious = () => gotoStep(current - 1)

  return (
    <div className={classes.helper}>
      <Badge
        badgeContent={`${current + 1} / ${totalSteps}`}
        color="primary"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        showZero
        className={classes.inner}
      >
        <Paper className={classes.inner}>
          <Box p={2}>
            <div className={classes.close}>
              <IconButton size="small" onClick={close}>
                <Close />
              </IconButton>
            </div>
            <Typography className={classes.content} onClick={handleNext}>
              {content}
            </Typography>
            <Controls data-tour-elem="controls" className={classes.controls}>
              <Box display="flex">
                <Button
                  onClick={handleReset}
                  disabled={current === 0}
                  size="small"
                  startIcon={<FirstPage />}
                  color={current !== 0 ? 'primary' : undefined}
                  variant="outlined"
                >
                  Reset
                </Button>
              </Box>
              <Box display="flex">
                <IconButton onClick={handlePrevious} disabled={current === 0} size="small">
                  <ArrowBack />
                </IconButton>
                <TourGuideDots current={current} totalSteps={totalSteps} gotoStep={gotoStep} />
                <IconButton onClick={handleNext} disabled={current === totalSteps - 1} size="small">
                  <ArrowForward />
                </IconButton>
              </Box>
            </Controls>
          </Box>
        </Paper>
      </Badge>
    </div>
  )
}

export default TourGuideHelper
