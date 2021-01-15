import React from 'react'
import ReactDOM from 'react-dom'
import App from 'features/App'
import reportWebVitals from './reportWebVitals'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { lightTheme } from 'themes'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
