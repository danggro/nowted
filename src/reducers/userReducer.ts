import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from './store'
import { CredentialsLogin } from '../types/types'

const initialState: CredentialsLogin = {
  username: '',
  password: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<CredentialsLogin>) {
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

// export const handleLogin = (credentials: CredentialsLogin) => {
//   return async (dispatch: AppDispatch) => {
//     // const user = await loginService.login(credentials)
//     window.localStorage.setItem('loggedUser', JSON.stringify(credentials))
//     dispatch(setUser(credentials))
//   }
// }

// export const handleLogout = () => {
//   return (dispatch) => {
//     window.localStorage.clear()
//     dispatch(setUser(null))
//   }
// }

export const { setUser } = userSlice.actions
export default userSlice.reducer
