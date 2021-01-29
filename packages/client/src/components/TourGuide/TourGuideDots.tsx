import { makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core'
import React, { useMemo } from 'react'
import { CustomHelperProps, Dot, Navigation } from 'reactour'

const useStyles = makeStyles((theme: Theme) => ({
  moreItemsDot: {
    width: 4,
    height: 4,
    margin: 4,
    border: '1px solid',
    borderRadius: '100%',
    borderColor: theme.palette.action.disabled,
  },
}))

interface DotConfig {
  dots: number[]
  moreBefore?: boolean
  moreAfter?: boolean
}

const getActiveDots = (totalDots: number, activeIndex: number, numDots: number): DotConfig => {
  const dots = Array.from(Array(totalDots).keys())
  const result: DotConfig = { dots }
  if (numDots < totalDots) {
    let start = activeIndex - Math.floor((numDots - 1) / 2)
    let end = activeIndex + Math.ceil((numDots - 1) / 2) + 1
    if (start < 0) {
      end -= start
      start = 0
    } else if (end > totalDots) {
      start -= end - totalDots
      end = totalDots
    }
    result.moreBefore = start > 0
    result.moreAfter = end < totalDots
    result.dots = dots.slice(Math.max(start, 0), Math.min(end, totalDots))
  }
  return result
}

type TourGuideDotsProps = Pick<CustomHelperProps, 'current' | 'totalSteps' | 'gotoStep'>

const TourGuideDots = ({ current, totalSteps, gotoStep }: TourGuideDotsProps) => {
  const classes = useStyles()
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.down('xs'))
  const sm = useMediaQuery(theme.breakpoints.down('sm'))

  const dotConfig = useMemo(() => {
    const numDots = xs ? 5 : sm ? 7 : 10
    return getActiveDots(totalSteps, current, numDots)
  }, [current, totalSteps, xs, sm])

  return (
    <Navigation data-tour-elem="navigation" style={{ margin: '0 4px' }}>
      {dotConfig.moreBefore && (
        <>
          <span className={classes.moreItemsDot} />
          {!dotConfig.moreAfter && <span className={classes.moreItemsDot} style={{ width: 6, height: 6 }} />}
        </>
      )}
      {dotConfig.dots.map(i => (
        <Dot
          key={i}
          onClick={() => current !== i && gotoStep(i)}
          current={current}
          index={i}
          disabled={current === i}
          data-tour-elem="dot"
          accentColor={theme.palette.primary.main}
        />
      ))}
      {dotConfig.moreAfter && (
        <>
          {!dotConfig.moreBefore && <span className={classes.moreItemsDot} style={{ width: 6, height: 6 }} />}
          <span className={classes.moreItemsDot} />
        </>
      )}
    </Navigation>
  )
}

export default TourGuideDots
