import { ThemeProvider } from '@emotion/react'
import { Box, Container, CssBaseline, Toolbar } from '@mui/material'
import Header from 'common/components/Header'
import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import theme from './theme'

const Units = lazy(() => import('features/Units'))

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
              <Units />
            </Suspense>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  )
}

export default App
