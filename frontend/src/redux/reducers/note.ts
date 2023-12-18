import { Action, ActionType } from 'redux/constants/noteConstants'
import { Note } from 'types/types'
import { Reducer, Action as ActionRedux } from 'redux'

export interface NoteView extends Note {
  view: Boolean
}

export interface NoteState {
  notes: Note[]
  note: NoteView
  actionError: string
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
  actionError: '',
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
        actionError: '',
        notes: payload ? payload : [],
      }
    case ActionType.ADD_NOTE:
      const noteAdded = state.notes.concat(payload)
      return {
        ...state,
        actionError: '',
        notes: payload ? noteAdded : state.notes,
      }
    case ActionType.UPDATE_NOTE:
      const noteUpdated = state.notes.map((note) => {
        return note.id === payload.id ? payload : note
      })
      return {
        ...state,
        actionError: '',
        notes: payload ? noteUpdated : state.notes,
      }
    case ActionType.DELETE_NOTE:
      const noteDeleted = state.notes.filter((note) => {
        return note.id !== payload
      })

      return {
        ...state,
        actionError: '',
        notes: payload ? noteDeleted : state.notes,
      }
    case ActionType.SET_NOTE:
      return {
        ...state,
        actionError: '',
        note: payload ? payload : state.note,
      }
    case ActionType.ACTION_FAIL:
      return {
        ...state,
        successMessage: '',
        actionError: payload ? payload : '',
      }
    case ActionType.ACTION_SUCCESS:
      return {
        ...state,
        actionError: '',
        successMessage: payload ? payload : '',
      }
    default:
      return state
  }
}

export default noteReducer
