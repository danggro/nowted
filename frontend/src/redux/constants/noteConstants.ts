import { NoteView } from 'redux/reducers/note'
import { Note } from 'types/types'

export enum ActionType {
  SET_INITIAL_NOTES = 'SET_INITIAL_NOTES',
  ADD_NOTE = 'ADD_NOTE',
  UPDATE_NOTE = 'UPDATE_NOTE',
  DELETE_NOTE = 'DELETE_NOTE',
  SET_NOTE = 'SET_NOTE',
  ACTION_FAIL = 'ACTION_FAIL',
  ACTION_SUCCESS = 'ACTION_SUCCESS',
  CLEAR_MESSAGE = 'CLEAR_MESSAGE',
  MOVE_TO_FOLDER = 'MOVE_TO_FOLDER',
}

export const SAVED_SUCCESS_MESSAGE = 'Note saved'
export const DELETE_SUCCESS_MESSAGE = 'Note deleted'
export const UNEXPECTED_ERROR = {
  title: 'Something went wrong.',
  date: 'Something went wrong.',
}

interface SetInitialNotes {
  type: ActionType.SET_INITIAL_NOTES
  payload: Note[]
}
interface AddNote {
  type: ActionType.ADD_NOTE
  payload: Note
}

interface UpdateNote {
  type: ActionType.UPDATE_NOTE
  payload: Note
}

interface DeleteNote {
  type: ActionType.DELETE_NOTE
  payload: number
}

interface SetNote {
  type: ActionType.SET_NOTE
  payload: NoteView
}

interface ActionFail {
  type: ActionType.ACTION_FAIL
  payload: { title: string; date: string }
}

interface ActionSuccess {
  type: ActionType.ACTION_SUCCESS
  payload: string
}

interface ClearMessage {
  type: ActionType.CLEAR_MESSAGE
  payload: string
}

interface MoveToFolder {
  type: ActionType.MOVE_TO_FOLDER
  payload: { fromId: number; toId: number }
}

export type Action =
  | SetInitialNotes
  | AddNote
  | UpdateNote
  | DeleteNote
  | SetNote
  | ActionFail
  | ActionSuccess
  | ClearMessage
  | MoveToFolder
