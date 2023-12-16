import { ReactNode, createContext, useReducer } from 'react'
import { Note } from 'types/types'
import notesService from 'services/notes'

type AddNotePayloadAction = {
  type: actions.ADD
  payload: {
    note: Note
  }
}

type GetNotesPayloadAction = {
  type: actions.INITIAL
  payload: {
    notes: Note[]
  }
}

type DeletePayloadActionType = {
  type: actions.DELETE
  payload: {
    id: number
  }
}

type UpdatePayloadActionType = {
  type: actions.UPDATE
  payload: {
    note: Note
  }
}

type ActionType =
  | AddNotePayloadAction
  | GetNotesPayloadAction
  | DeletePayloadActionType
  | UpdatePayloadActionType

enum actions {
  ADD = 'ADD',
  INITIAL = 'INITIAL',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
}

const reducer = (state: Note[], action: ActionType) => {
  switch (action.type) {
    case actions.ADD:
      return state.concat((action as AddNotePayloadAction).payload.note)
    case actions.INITIAL:
      return (action as GetNotesPayloadAction).payload.notes
    case actions.DELETE:
      return state.filter(
        (note) => note.id !== (action as DeletePayloadActionType).payload.id
      )
    case actions.UPDATE:
      return state.map((note) =>
        note.id !== (action as UpdatePayloadActionType).payload.note.id
          ? note
          : action.payload.note
      )
    default:
      return state
  }
}
interface DefaultValue {
  notes: Note[]
  getInitialNotes: () => void
  addNote: (note: Note) => Promise<Note>
  deleteNote: (id: number) => void
  updateNote: (note: Note) => void
}
export const NotesContext = createContext<DefaultValue>({} as DefaultValue)

export const NotesContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, [])

  const getInitialNotes = async () => {
    const { data } = await notesService.get()
    dispatch({ type: actions.INITIAL, payload: { notes: data } })
  }

  const addNote = async (note: Note): Promise<Note> => {
    const { data } = await notesService.add(note)
    dispatch({ type: actions.ADD, payload: { note: data } })
    return data
  }

  const deleteNote = async (id: number) => {
    await notesService.deleteNote(id)
    dispatch({ type: actions.DELETE, payload: { id } })
  }

  const updateNote = async (note: Note) => {
    await notesService.update(note)
    dispatch({ type: actions.UPDATE, payload: { note } })
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
