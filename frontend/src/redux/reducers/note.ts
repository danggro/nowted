import { Action, ActionType } from 'redux/constants/noteConstants'
import { Note } from 'types/types'
import { Reducer, Action as ActionRedux } from 'redux'

export interface NoteView extends Note {
  view: boolean
}

export interface NoteState {
  notes: Note[]
  note: NoteView
  actionError: {
    title: string
    date: string
  }
  successMessage: string
}

const initialState: NoteState = {
  notes: [],
  note: {
    title: '',
    date: '',
    content: '',
    view: false,
  },
  actionError: { title: '', date: '' },
  successMessage: '',
}

const noteReducer: Reducer<NoteState, ActionRedux> = (
  state: NoteState = initialState,
  action: ActionRedux
): NoteState => {
  const { type, payload } = action as Action
  switch (type) {
    case ActionType.SET_INITIAL_NOTES:
      return {
        ...state,
        actionError: { title: '', date: '' },
        notes: payload ? payload : [],
      }
    case ActionType.ADD_NOTE:
      const noteAdded = state.notes.concat(payload)
      return {
        ...state,
        actionError: { title: '', date: '' },
        notes: payload ? noteAdded : state.notes,
      }
    case ActionType.UPDATE_NOTE:
      const noteUpdated = state.notes.map((note) => {
        return note.id === payload.id ? payload : note
      })
      return {
        ...state,
        actionError: { title: '', date: '' },
        notes: payload ? noteUpdated : state.notes,
      }
    case ActionType.DELETE_NOTE:
      const noteDeleted = state.notes.filter((note) => {
        return note.id !== payload
      })
      return {
        ...state,
        actionError: { title: '', date: '' },
        notes: payload ? noteDeleted : state.notes,
      }
    case ActionType.SET_NOTE:
      return {
        ...state,
        actionError: { title: '', date: '' },
        note: payload ? payload : state.note,
      }
    case ActionType.ACTION_FAIL:
      return {
        ...state,
        successMessage: '',
        actionError: { title: payload.title, date: payload.date },
      }
    case ActionType.ACTION_SUCCESS:
      return {
        ...state,
        actionError: { title: '', date: '' },
        successMessage: payload ? payload : '',
      }
    case ActionType.CLEAR_MESSAGE:
      return {
        ...state,
        actionError: { title: '', date: '' },
        successMessage: payload,
      }
    default:
      return state
  }
}

export default noteReducer
