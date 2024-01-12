import './assets/global.css'
import './assets/fonts.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotePage from './pages/NotePage'
import NotFound404 from 'components/NotFound404'

const App = () => {
  const location = useLocation()
  const pathList = ['/', '/login', '/signup']

  return (
    <>
      <Routes>
        {!pathList.find((path) => path === location.pathname) && (
          <Route path={location.pathname} element={<NotFound404 />}></Route>
        )}
        <Route path="/" element={<NotePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </>
  )
}
export default App
