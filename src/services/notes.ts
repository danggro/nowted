import axios from 'axios'
import { baseUrl } from '../utils/contants'
import { Note, NoteForm } from '../types/types'

const get = async (userId: number) => {
  const response = await axios.get<Note[]>(
    `${baseUrl}/notes?userId_like=${userId}`
  )
  return response
}

const add = async (note: NoteForm) => {
  const response = await axios.post(`${baseUrl}/notes`, note)
  return response
}

const deleteNote = async (id: number) => {
  const response = await axios.delete(`${baseUrl}/notes/${id}`)
  return response
}

const update = async (note: Note) => {
  const response = await axios.put(`${baseUrl}/notes/${note.id}`, note)
  return response
}

export default { get, add, deleteNote, update }
