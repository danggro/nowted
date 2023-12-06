import { ReactNode, createContext, useReducer } from 'react'
import { NoteState } from '../types/types'

enum actions {
  SET = 'SET',
}

export const reducer = (
  state: NoteState,
  action: { type: actions; payload: NoteState }
) => {
  switch (action.type) {
    case actions.SET:
      return action.payload
    default:
      return state
  }
}
interface DefaultValue {
  note: NoteState
  setNote: (note: NoteState) => void
}
export const NoteContext = createContext<DefaultValue>({} as DefaultValue)

export const NoteContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {} as NoteState)

  const value = {
    note: state,
    setNote: (note: NoteState) => {
      dispatch({ type: actions.SET, payload: note })
    },
  }

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>
}

export default NoteContextProvider
