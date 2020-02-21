import { useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

const useRouteFind = (routes: string[], defaultIndex = 0): [number, boolean, string] => {
  const location = useLocation();
  const [index, setIndex] = useState(defaultIndex);
  const [matched, setMatched] = useState(true);
  const [route, setRoute] = useState(routes[defaultIndex]);

  useEffect(() => {
    [...routes].reverse().some((path, index) => {
      if (matchPath(location.pathname, { path })) {
        setMatched(true);
        const routeIndex = routes.length - (index + 1);
        setIndex(routeIndex);
        setRoute(routes[routeIndex]);
        return true;
      }
      setMatched(false);
      setIndex(defaultIndex);
      setRoute(routes[defaultIndex]);
      return false;
    });
  }, [location, routes, defaultIndex]);

  return [index, matched, route];
};

export default useRouteFind;
