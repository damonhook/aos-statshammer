import { useEffect, useState } from 'react'
import { useLocation, matchPath } from 'react-router-dom'
import { PageRoute, PAGE_ROUTES } from 'utils/routes'

const useCurrentRoute = () => {
  const [route, setRoute] = useState<PageRoute>(PAGE_ROUTES.HOME)
  const location = useLocation()

  useEffect(() => {
    let route = Object.values(PAGE_ROUTES)
      .reverse()
      .find(path => matchPath(location.pathname, { path }))
    setRoute(route ?? PAGE_ROUTES.HOME)
  }, [location])

  return route
}

export default useCurrentRoute
