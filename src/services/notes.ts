import axios from 'axios'
import { baseUrl } from '../utils/contants'

const get = async (id: number) => {
  console.log(process.env.NODE_ENV)

  const response = await axios.get(`${baseUrl}/notes?userId_like=${id}`)
  return response
}

export default { get }
