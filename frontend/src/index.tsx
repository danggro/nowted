import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import { HashRouter as Router } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import createAppStore from 'redux/store'

const store = createAppStore()

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
