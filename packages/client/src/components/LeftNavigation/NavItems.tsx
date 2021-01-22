import { BarChart, Home, Info, PictureAsPdf, Timeline } from '@material-ui/icons'
import { useCurrentRoute, useIsMobile } from 'hooks'
import React, { useMemo } from 'react'
import { PAGE_ROUTES, PageRoute } from 'utils/routes'

import ListItemLink from './components/ListItemLink'

interface NavItemConfig {
  label: string
  route: PageRoute
  icon: React.ReactNode
  onlyMobile?: boolean
}

const navConfig: NavItemConfig[] = [
  { label: 'Home', route: PAGE_ROUTES.HOME, icon: <Home /> },
  { label: 'Stats', route: PAGE_ROUTES.STATS, icon: <BarChart />, onlyMobile: true },
  { label: 'Simulations', route: PAGE_ROUTES.SIMULATIONS, icon: <Timeline /> },
  { label: 'Download PDF', route: PAGE_ROUTES.EXPORT, icon: <PictureAsPdf /> },
  { label: 'About', route: PAGE_ROUTES.ABOUT, icon: <Info /> },
]

interface NavItemsProps {
  route: PageRoute
  open: boolean
  onClose: () => void
}

const NavItems = ({ route, open, onClose }: NavItemsProps) => {
  const isMobile = useIsMobile()

  const value = useMemo(() => {
    const index = navConfig.findIndex(n => (!n.onlyMobile || isMobile) && n.route === route)
    return index !== -1 ? index : 0
  }, [route, isMobile])

  return (
    <>
      {navConfig.map(
        ({ label, route, icon, onlyMobile }, index) =>
          (!onlyMobile || isMobile) && (
            <ListItemLink
              primary={label}
              to={route}
              icon={icon}
              tooltip={!open}
              selected={index === value}
              key={label}
              onClose={onClose}
            />
          )
      )}
    </>
  )
}

export default NavItems
