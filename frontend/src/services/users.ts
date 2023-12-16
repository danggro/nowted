import axios from 'axios'
import { User, UserForm } from 'types/types'
import { baseUrl } from 'utils/contants'

const getAll = async () => {
  const response = await axios.get<User[]>(`${baseUrl}/users`)
  return response
}

const add = async (object: UserForm) => {
  const response = await axios.post<UserForm>(`${baseUrl}/users`, object)
  return response
}

export default { getAll, add }
