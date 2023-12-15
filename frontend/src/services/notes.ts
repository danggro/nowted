import axios from 'axios'
import { baseUrl } from 'utils/contants'
import { Note, NoteForm } from 'types/types'
import { getLocalSession } from 'utils/utils'

const get = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getLocalSession().token}` },
  }
  const response = await axios.get<Note[]>(`${baseUrl}/notes`, config)
  return response
}

const add = async (note: NoteForm) => {
  const config = {
    headers: { Authorization: `Bearer ${getLocalSession().token}` },
  }
  const response = await axios.post<Note>(`${baseUrl}/notes`, note, config)
  return response
}

const deleteNote = async (id: number) => {
  const config = {
    headers: { Authorization: `Bearer ${getLocalSession().token}` },
  }
  const response = await axios.delete(`${baseUrl}/notes/${id}`, config)
  return response
}

const update = async (note: Note) => {
  const config = {
    headers: { Authorization: `Bearer ${getLocalSession().token}` },
  }
  const response = await axios.put(`${baseUrl}/notes/${note.id}`, note, config)
  return response
}

export default { get, add, deleteNote, update }
