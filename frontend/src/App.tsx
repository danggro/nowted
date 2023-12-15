import './assets/global.css'
import './assets/fonts.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotePage from './pages/NotePage'
import NotesContextProvider from './context/NotesContext'

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <NotesContextProvider>
              <NotePage />
            </NotesContextProvider>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </>
  )
}
export default App
