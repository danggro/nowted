import { ReactNode, createContext, useReducer } from 'react'
import { Note } from '../types/types'

enum actions {
  SET = 'SET',
}

export const reducer = (
  state: Note,
  action: { type: actions; payload: Note }
) => {
  switch (action.type) {
    case actions.SET:
      return action.payload
    default:
      return state
  }
}
interface DefaultValue {
  note: Note
  setNote: (note: Note) => void
}
export const NoteContext = createContext<DefaultValue>({} as DefaultValue)

export const NoteContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {} as Note)

  const value = {
    note: state,
    setNote: (note: Note) => {
      dispatch({ type: actions.SET, payload: note })
    },
  }

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>
}

export default NoteContextProvider
