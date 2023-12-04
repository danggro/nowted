import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from './store'
import { CredentialsLogin, Session } from '../types/types'
import auth from '../services/auth'
import users from '../services/users'

const initialState: Session = {
  username: '',
  token: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Session>) {
      return action.payload
    },
  },
})

// export const setInitialUser = () => {
//   return (dispatch) => {
//     const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
//     if (loggedUserJSON) {
//       const user = JSON.parse(loggedUserJSON)
//       dispatch(setUser(user))
//       blogService.setToken(user.token)
//     }
//   }
// }

export const handleLogin = (credentials: CredentialsLogin) => {
  return async (dispatch: AppDispatch) => {
    const getUsers = await users.getAll()
    const user = getUsers.data.find((u) => u.username === credentials.username)
    if (!user) throw new Error('User not found')
    if (user.password !== credentials.password)
      throw new Error('Wrong password')

    const { data } = await auth.login(credentials)
    window.localStorage.setItem(
      'loggedUser',
      JSON.stringify({ username: data.username, token: data.id })
    )
    dispatch(
      setUser({
        username: data.username,
        token: data.id.toString(),
      })
    )
  }
}

// export const handleLogout = () => {
//   return (dispatch) => {
//     window.localStorage.clear()
//     dispatch(setUser(null))
//   }
// }

export const { setUser } = userSlice.actions
export default userSlice.reducer
