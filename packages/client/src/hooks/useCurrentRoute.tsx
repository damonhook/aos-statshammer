import { useEffect, useState } from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import { PAGE_ROUTES, PageRoute } from 'utils/routes'

const useCurrentRoute = () => {
  const [route, setRoute] = useState<PageRoute>(PAGE_ROUTES.HOME)
  const location = useLocation()

  useEffect(() => {
    const route = Object.values(PAGE_ROUTES)
      .reverse()
      .find(path => matchPath(location.pathname, { path }))
    setRoute(route ?? PAGE_ROUTES.HOME)
  }, [location])

  return route
}

export default useCurrentRoute
