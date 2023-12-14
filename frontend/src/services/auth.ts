import axios from 'axios'
import { CredentialsLogin, Session } from 'types/types'
import { baseUrl } from 'utils/contants'
import { getLocalSession } from 'utils/utils'

const login = async (object: CredentialsLogin) => {
  console.log(object)

  const response = await axios.post<Session>(`${baseUrl}/auth/login`, {
    username: object.username,
    password: object.password,
  })
  return response
}

const logout = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getLocalSession().token}` },
  }
  const response = await axios.delete(`${baseUrl}/auth/logout/`, config)
  return response
}

const getSession = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getLocalSession().token}` },
  }
  const response = await axios.get<Session>(`${baseUrl}/auth/session`, config)
  return response.data
}

export default { login, logout, getSession }
