import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Tour, { ReactourProps, ReactourStep } from 'reactour'

import TourGuideHelper from './TourGuideHelper'

interface TourGuideProps
  extends Omit<ReactourProps, 'steps' | 'rounded' | 'CustomHelper' | 'onAfterOpen' | 'onBeforeClose'> {
  steps: ReactourStep[] | (() => ReactourStep[])
}

const TourGuide = ({ steps, ...props }: TourGuideProps) => {
  const getSteps = () => {
    if (typeof steps === 'function') return steps()
    return steps
  }

  const disableBody = (target: HTMLElement | Element) => disableBodyScroll(target)
  const enableBody = (target: HTMLElement | Element) => enableBodyScroll(target)

  return (
    <Tour
      steps={getSteps()}
      rounded={4}
      {...props}
      CustomHelper={TourGuideHelper}
      onAfterOpen={disableBody}
      onBeforeClose={enableBody}
      disableFocusLock
    />
  )
}

export default TourGuide
