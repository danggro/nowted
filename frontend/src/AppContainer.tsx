import './assets/global.css'
import './assets/fonts.css'
import { useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet'
import { getTitleFromRoute } from 'utils/utils'
import createAppStore from 'redux/store'
import App from 'App'

const store = createAppStore()

const AppContainer = () => {
  const location = useLocation()
  return (
    <Provider store={store}>
      <Helmet>
        <title>{`Nowted | ${getTitleFromRoute(location.pathname)}`}</title>
      </Helmet>
      <App />
    </Provider>
  )
}
export default AppContainer
