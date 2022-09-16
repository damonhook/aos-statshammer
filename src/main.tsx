import { ChakraProvider } from '@chakra-ui/react'
import App from 'app/App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { parseBoolean } from './utils/env'

if (!import.meta.env.PROD && parseBoolean(import.meta.env.VITE_USE_MOCK_API)) {
  const { worker } = await import('./mocks/browser')
  worker.start()
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
