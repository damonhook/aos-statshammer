import { Box, Container, CssBaseline, Toolbar } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import Header from 'common/components/Header'
import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import routes from './routes'
import theme from './theme'

const Units = lazy(() => import('features/Units'))
const Comparison = lazy(() => import('features/Comparison'))

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <CssBaseline />
          <Box sx={{ display: 'flex' }}>
            <Header />
          </Box>
          <Toolbar />
          <Container component="main" sx={{ flexGrow: 1, p: { xs: 1.5, md: 2 } }}>
            <Suspense fallback={null}>
              <Switch>
                <Route path={routes.COMPARISON.rule} component={Comparison} />
                <Route component={Units} />
              </Switch>
            </Suspense>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  )
}

export default App
