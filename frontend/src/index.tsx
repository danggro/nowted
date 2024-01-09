import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import AppContainer from 'AppContainer'

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <Router>
    <AppContainer />
  </Router>,
  document.getElementById('root')
)
