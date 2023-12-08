import { CredentialsLogin, Session, User } from 'types/types'
import axios from 'axios'
import { baseUrl } from 'utils/contants'

interface ResponseSession extends Session {
  id: number
}

const login = async (object: Session) => {
  const response = await axios.post<ResponseSession>(`${baseUrl}/login`, {
    username: object.username,
    token: object.token,
  })
  return response
}

const logout = async (id: string) => {
  // const response = await axios.delete(`${baseUrl}/login?token_like=${token}`)

  const response = await axios.delete(`${baseUrl}/login/${id}`)
  return response
}

const getSession = async (username: string) => {
  const response = await axios.get<ResponseSession[]>(
    `${baseUrl}/login?username_like=${username}`
  )
  return response.data
}

export default { login, logout, getSession }
