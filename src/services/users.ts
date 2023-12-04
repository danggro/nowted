import axios from 'axios'

const baseUrl = process.env.BACKEND_API
interface User {
  id: number
  username: string
  email: string
  created_at: string
  password: string
}
const getAll = async () => {
  const response = await axios.get<User[]>(`${baseUrl}/users`)
  return response
}

export default { getAll }
