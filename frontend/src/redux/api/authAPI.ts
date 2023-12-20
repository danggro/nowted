import { CredentialsLogin, User, UserForm, Session } from 'types/types'
import { API, handleApiError } from './utils'

export const signIn = async (credential: CredentialsLogin) => {
  try {
    const res = await API.post<Session>('/auth/login', credential)
    return { error: null, data: res.data }
  } catch (error) {
    return handleApiError(error)
  }
}

export const signUp = async (formData: UserForm) => {
  try {
    const res = await API.post<User>('/users', formData)
    return { error: null, data: res.data }
  } catch (error) {
    return handleApiError(error)
  }
}

export const logout = async (accessToken: string) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
  try {
    const res = await API.delete('/auth/logout', config)
    return { error: null, data: res.data }
  } catch (error) {
    return handleApiError(error)
  }
}

export const getSession = async (accessToken: string) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
  try {
    const res = await API.get('/auth/session', config)
    return { error: null, data: res.data }
  } catch (error) {
    return handleApiError(error)
  }
}
