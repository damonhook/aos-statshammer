import { Box } from '@mui/material'
import React from 'react'
import { Route, RouteProps, Switch, useLocation } from 'react-router-dom'
import { animated, useTransition } from 'react-spring'

type AnimatedRouteProps = Omit<RouteProps, 'ref' | 'component' | 'render'>

const AnimatedRoute = ({ children, ...rest }: AnimatedRouteProps) => {
  const ref = React.useRef(null)

  return (
    <Route {...rest}>
      <Box ref={ref} className="page-container page">
        {children}
      </Box>
    </Route>
  )
}

interface AnimatedSwitchProps {
  children?: React.ReactNode
}

const AnimatedSwitch = ({ children }: AnimatedSwitchProps) => {
  const location = useLocation()
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })

  return transitions((style, item) => (
    <animated.div style={{ ...style, position: 'absolute' }}>
      <div>
        <Switch location={item}>{children}</Switch>
      </div>
    </animated.div>
  ))
}

AnimatedSwitch.Route = AnimatedRoute

export default AnimatedSwitch
