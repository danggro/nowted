import { ReactNode, createContext, useReducer } from 'react'
import { Note } from 'types/types'
import notesService from 'services/notes'

enum actions {
  ADD = 'ADD',
  INITIAL = 'INITIAL',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
}

const reducer = (state: Note[], action: { type: actions; payload: any }) => {
  switch (action.type) {
    case actions.ADD:
      return state.concat(action.payload)
    case actions.INITIAL:
      return action.payload
    case actions.DELETE:
      return state.filter((note) => note.id !== action.payload)
    case actions.UPDATE:
      return state.map((note) =>
        note.id !== action.payload.id ? note : action.payload
      )
    default:
      return state
  }
}
interface DefaultValue {
  notes: Note[]
  getInitialNotes: (userId: number) => void
  addNote: (note: Note) => Promise<Note>
  deleteNote: (id: number) => void
  updateNote: (note: Note) => void
}
export const NotesContext = createContext<DefaultValue>({} as DefaultValue)

export const NotesContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, [])

  const getInitialNotes = async (userId: number) => {
    const { data } = await notesService.get(userId)
    dispatch({ type: actions.INITIAL, payload: data })
  }

  const addNote = async (note: Note): Promise<Note> => {
    const { data } = await notesService.add(note)
    dispatch({ type: actions.ADD, payload: data })
    return data
  }

  const deleteNote = async (id: number) => {
    await notesService.deleteNote(id)
    dispatch({ type: actions.DELETE, payload: id })
  }

  const updateNote = async (note: Note) => {
    await notesService.update(note)
    dispatch({ type: actions.UPDATE, payload: note })
  }
  const value = {
    notes: state,
    getInitialNotes,
    addNote,
    deleteNote,
    updateNote,
  }
  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
}

export default NotesContextProvider
