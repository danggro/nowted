import axios from 'axios'
import { CredentialsLogin, Session } from 'types/types'
import { baseUrl } from 'utils/contants'
import { getLocalSession } from 'utils/utils'

const localSession = getLocalSession()
const token = localSession !== null ? localSession.token : ''

const login = async (object: CredentialsLogin) => {
  const response = await axios.post<Session>(`${baseUrl}/auth/login`, {
    username: object.username,
    password: object.password,
  })
  return response
}

const logout = async () => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.delete(`${baseUrl}/auth/logout/`, config)
  return response
}

const getSession = async () => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  try {
    const response = await axios.get<Session>(`${baseUrl}/auth/session`, config)
    return response.data
  } catch (err) {
    return null
  }
}

export default { login, logout, getSession }
