import {
  ChildContextProvider,
  ReactNode,
  createContext,
  useReducer,
} from 'react'
import { Note } from '../types/types'
import notesService from '../services/notes'

enum actions {
  ADD = 'ADD',
  INITIAL = 'INITIAL',
  GET_ID = 'GET_ID',
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

  const deleteNote = async (id: number) => {
    await notesService.deleteNote(id)
    dispatch({ type: actions.DELETE, payload: id })
  }

  const updateNote = async (note: Note) => {
    dispatch({ type: actions.UPDATE, payload: note })
  }
  const value = {
    notes: state,
    getInitialNotes,
    deleteNote,
    updateNote,
  }
  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
}

export default NotesContextProvider
