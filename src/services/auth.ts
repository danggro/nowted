import { CredentialsLogin, Session, User } from '../types/types'
import axios from 'axios'

const baseUrl = process.env.BACKEND_API

interface ResponseSession extends Session {
  id: number
}

const login = async (credentials: CredentialsLogin) => {
  const response = await axios.post<ResponseSession>(`${baseUrl}/login`, {
    username: credentials.username,
  })
  return response
}

const logout = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/login/${id}`)
  return response
}

const getSession = async (username: string) => {
  const { data } = await axios.get<ResponseSession[]>(
    `${baseUrl}/login?username_like=${username}`
  )
  return data
}

export default { login, logout, getSession }
