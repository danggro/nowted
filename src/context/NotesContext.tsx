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

const reducer = (state: Note[], action: { type: actions; payload: Note[] }) => {
  switch (action.type) {
    case actions.ADD:
      return state.concat(action.payload)
    case actions.INITIAL:
      return action.payload
    default:
      return state
  }
}
interface DefaultValue {
  notes: Note[]
  getInitialData: (userId: number) => void
}
export const NotesContext = createContext<DefaultValue>({} as DefaultValue)

export const NotesContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, [])
  const getInitialData = async (userId: number) => {
    const { data } = await notesService.get(userId)
    dispatch({ type: actions.INITIAL, payload: data })
  }
  const value = {
    notes: state,
    getInitialData,
  }
  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
}

export default NotesContextProvider
