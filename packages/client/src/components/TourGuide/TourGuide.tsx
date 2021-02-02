import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import React, { useMemo } from 'react'
import Tour, { ReactourProps, ReactourStep } from 'reactour'

import TourGuideHelper from './TourGuideHelper'

interface TourGuideProps
  extends Omit<ReactourProps, 'steps' | 'rounded' | 'CustomHelper' | 'onAfterOpen' | 'onBeforeClose'> {
  steps: ReactourStep[] | (() => ReactourStep[])
}

const TourGuide = ({ steps, ...props }: TourGuideProps) => {
  const stepConfig = useMemo(() => {
    if (typeof steps === 'function') return steps()
    return steps
  }, [steps])

  const disableBody = (target: HTMLElement | Element) => disableBodyScroll(target)
  const enableBody = (target: HTMLElement | Element) => enableBodyScroll(target)

  return (
    <>
      {stepConfig && stepConfig.length ? (
        <Tour
          steps={stepConfig}
          rounded={4}
          {...props}
          CustomHelper={TourGuideHelper}
          onAfterOpen={disableBody}
          onBeforeClose={enableBody}
          disableFocusLock
        />
      ) : null}
    </>
  )
}

export default TourGuide
