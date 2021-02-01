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
}

const HomeTourGuide = ({ open, onClose }: PageTourGuideProps) => {
  const homeTab = useSelector((state: Store) => state.ui.homeTab)
  const numTargetModifiers = useSelector((state: Store) => state.target.modifiers.length)
  const dispatch = useDispatch()
  const isMobile = useIsMobile()

  const handleHomeTabChange = useCallback(
    (tab: HomeTab) => {
      dispatch(uiStore.actions.setHomeTab({ tab }))
    },
    [dispatch]
  )

  const handleClose = () => {
    handleHomeTabChange('units')
    onClose()
  }

  const unitsSteps = useMemo(() => {
    return getUnitsHelpSteps({ setHomeTab: handleHomeTabChange })
  }, [handleHomeTabChange])

  const statsSteps = useMemo(() => {
    if (isMobile) return []
    return getStatsHelpSteps({ numTargetModifiers })
  }, [isMobile, numTargetModifiers])

  return (
    <TourGuide
      steps={[...unitsSteps, ...statsSteps]}
      isOpen={open}
      onRequestClose={handleClose}
      update={homeTab}
      updateDelay={100}
    />
  )
}

const StatsTourGuide = ({ open, onClose }: PageTourGuideProps) => {
  const numTargetModifiers = useSelector((state: Store) => state.target.modifiers.length)
  const helpSteps = getStatsHelpSteps({ numTargetModifiers })

  return <TourGuide steps={helpSteps} isOpen={open} onRequestClose={onClose} />
}

type HelpConfig = Partial<{ [r in PageRoute]: React.ComponentType<PageTourGuideProps> }>
const helpConfig: HelpConfig = {
  [PAGE_ROUTES.HOME]: HomeTourGuide,
  [PAGE_ROUTES.STATS]: StatsTourGuide,
}

const PageHelp = () => {
  const [open, setOpen] = useState(false)
  const route = useCurrentRoute()
  const HelpElement = useMemo(() => helpConfig[route], [route])
  useEffect(() => setOpen(false), [route])

  return HelpElement ? (
    <>
      <IconButton onClick={() => setOpen(true)} color="inherit">
        <HelpOutline />
      </IconButton>
      <HelpElement open={open} onClose={() => setOpen(false)} />
    </>
  ) : null
}

export default PageHelp
