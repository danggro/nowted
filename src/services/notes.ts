import axios from 'axios'
import { baseUrl } from '../utils/contants'
import { Note, NoteForm } from '../types/types'

const get = async (id: number) => {
  const response = await axios.get<Note[]>(`${baseUrl}/notes?userId_like=${id}`)
  return response
}

const add = async (note: NoteForm) => {
  const response = await axios.post(`${baseUrl}/notes`, note)
  return response
}

export default { get, add }
