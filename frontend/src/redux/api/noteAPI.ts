import { Note, NoteForm } from 'types/types'
import { API, handleApiError, setConfig } from './utils'
import { getLocalSession } from 'utils/utils'

export const addNote = async (note: NoteForm) => {
  const session = getLocalSession()
  try {
    const res = await API.post<Note>(
      '/notes',
      note,
      setConfig(session?.accessToken)
    )
    return { error: null, data: res.data }
  } catch (error) {
    return handleApiError(error)
  }
}

export const getNote = async () => {
  const session = getLocalSession()
  try {
    const res = await API.get<Note[]>(
      `/notes/`,
      setConfig(session?.accessToken)
    )
    return { error: null, data: res.data }
  } catch (error) {
    return handleApiError(error)
  }
}

export const deleteNote = async (id: number) => {
  const session = getLocalSession()
  try {
    const res = await API.delete(
      `/notes/${id}`,
      setConfig(session?.accessToken)
    )
    return { error: null, data: res.data }
  } catch (error) {
    return handleApiError(error)
  }
}

export const updateNote = async (note: Note) => {
  const session = getLocalSession()
  try {
    const res = await API.put<Note>(
      `/notes/`,
      note,
      setConfig(session?.accessToken)
    )
    return { error: null, data: res.data }
  } catch (error) {
    return handleApiError(error)
  }
}

export const moveNoteToFolder = async (fromId: number, toId: number) => {
  const session = getLocalSession()

  try {
    const res = await API.put<number[]>(
      `/notes/movetofolder`,
      { fromId, toId },
      setConfig(session?.accessToken)
    )
    return { error: null, data: res.data }
  } catch (error) {
    return handleApiError(error)
  }
}
