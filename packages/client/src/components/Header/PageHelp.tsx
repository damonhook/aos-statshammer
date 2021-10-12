import { IconButton } from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'
import TourGuide from 'components/TourGuide'
import getStatsHelpSteps from 'help/statsHelp'
import getUnitsHelpSteps from 'help/unitsHelp'
import { useCurrentRoute, useIsMobile } from 'hooks'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uiStore } from 'store/slices'
import Store from 'types/store'
import { HomeTab } from 'types/store/ui'
import { PAGE_ROUTES, PageRoute } from 'utils/routes'

interface PageTourGuideProps {
  open: boolean
  onClose: () => void
  hasStepsCallback: (value: boolean) => void
}

const HomeTourGuide = ({ open, onClose, hasStepsCallback }: PageTourGuideProps) => {
  const tab = useSelector((state: Store) => state.ui.home.tab)
  const numTargetModifiers = useSelector((state: Store) => state.target.modifiers.length)
  const dispatch = useDispatch()
  const isMobile = useIsMobile()

  const handleHomeTabChange = useCallback(
    (newTab: HomeTab) => {
      dispatch(uiStore.actions.setHomeUI({ tab: newTab }))
    },
    [dispatch]
  )

  const handleClose = () => {
    handleHomeTabChange('units')
    onClose()
  }

  const helpSteps = useMemo(() => {
    const unitsSteps = getUnitsHelpSteps({ setHomeTab: handleHomeTabChange })
    const statsSteps = !isMobile ? getStatsHelpSteps({ numTargetModifiers }) : []
    return [...unitsSteps, ...statsSteps]
  }, [handleHomeTabChange, isMobile, numTargetModifiers])

  useEffect(() => {
    console.log(helpSteps)
    hasStepsCallback(!!(helpSteps && helpSteps.length))
  }, [hasStepsCallback, helpSteps])

  return (
    <TourGuide steps={helpSteps} isOpen={open} onRequestClose={handleClose} update={tab} updateDelay={100} />
  )
}

const StatsTourGuide = ({ open, onClose, hasStepsCallback }: PageTourGuideProps) => {
  const numTargetModifiers = useSelector((state: Store) => state.target.modifiers.length)
  const helpSteps = getStatsHelpSteps({ numTargetModifiers })

  useEffect(() => {
    hasStepsCallback(!!(helpSteps && helpSteps.length))
  }, [hasStepsCallback, helpSteps])

  return <TourGuide steps={helpSteps} isOpen={open} onRequestClose={onClose} />
}

type HelpConfig = Partial<{ [r in PageRoute]: React.ComponentType<PageTourGuideProps> }>
const helpConfig: HelpConfig = {
  [PAGE_ROUTES.HOME]: HomeTourGuide,
  [PAGE_ROUTES.STATS]: StatsTourGuide,
}

const PageHelp = () => {
  const [open, setOpen] = useState(false)
  const [hasSteps, setHasSteps] = useState(false)

  const route = useCurrentRoute()
  const HelpElement = useMemo(() => helpConfig[route], [route])

  useEffect(() => setOpen(false), [route])

  const handleHasSteps = useCallback((value: boolean) => {
    setHasSteps(value)
  }, [])

  console.log(hasSteps)

  return HelpElement ? (
    <>
      {hasSteps && (
        <IconButton onClick={() => setOpen(true)} color="inherit">
          <HelpOutline />
        </IconButton>
      )}
      <HelpElement open={open} onClose={() => setOpen(false)} hasStepsCallback={handleHasSteps} />
    </>
  ) : null
}

export default PageHelp
