import { Router, Route, RootRoute, NotFoundRoute } from "@tanstack/react-router"
import Root from "@/pages/root"
import Home from "@/pages/home"
import Units from "@/pages/units"
import NotFound from "@/pages/404"
import ModelGroup from "@/pages/model-group"

export const rootRoute = new RootRoute({
  component: () => <Root />,
})

export const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <NotFound />,
})

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Home />,
})

export const unitsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/units",
})

export const unitsIndexRoute = new Route({
  getParentRoute: () => unitsRoute,
  path: "/",
  component: () => <Units />,
})

export const modelGroupRoute = new Route({
  getParentRoute: () => unitsRoute,
  path: "/$unitId/$modelGroupId",
  component: () => <ModelGroup />,
})

export const routeTree = rootRoute.addChildren([
  indexRoute,
  unitsRoute.addChildren([unitsIndexRoute, modelGroupRoute]),
])

export default new Router({ routeTree, notFoundRoute })
