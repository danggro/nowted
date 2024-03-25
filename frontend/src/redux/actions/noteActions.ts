import { Dispatch } from 'redux'
import {
  Action,
  ActionType,
  UNEXPECTED_ERROR,
  SAVED_SUCCESS_MESSAGE,
} from 'redux/constants/noteConstants'
import { Note, NoteForm } from 'types/types'
import * as api from 'redux/api/noteAPI'
import { NoteView } from 'redux/reducers/note'

export const setInitialNotesAction =
  () => async (dispatch: Dispatch<Action>) => {
    try {
      const response = await api.getNote()
      const { error, data } = response
      if (error || !data) {
        dispatch({ type: ActionType.ACTION_FAIL, payload: error })
      } else {
        dispatch({
          type: ActionType.SET_INITIAL_NOTES,
          payload: data,
        })
      }
    } catch (error) {
      dispatch({ type: ActionType.ACTION_FAIL, payload: UNEXPECTED_ERROR })
    }
  }

export const addNoteAction =
  (note: NoteForm) => async (dispatch: Dispatch<Action>) => {
    try {
      const response = await api.addNote(note)
      const { error, data } = response
      if (error || !data) {
        dispatch({ type: ActionType.ACTION_FAIL, payload: error })
      } else {
        dispatch({
          type: ActionType.ADD_NOTE,
          payload: data,
        })
        dispatch({
          type: ActionType.SET_NOTE,
          payload: { ...data, view: true },
        })
        dispatch({
          type: ActionType.ACTION_SUCCESS,
          payload: SAVED_SUCCESS_MESSAGE,
        })
      }
    } catch (error) {
      dispatch({ type: ActionType.ACTION_FAIL, payload: UNEXPECTED_ERROR })
    }
  }

export const updateNoteAction =
  (note: Note) => async (dispatch: Dispatch<Action>) => {
    try {
      const response = await api.updateNote(note)
      const { error, data } = response
      if (error || !data) {
        dispatch({ type: ActionType.ACTION_FAIL, payload: error })
      } else {
        dispatch({
          type: ActionType.UPDATE_NOTE,
          payload: data,
        })
        dispatch({
          type: ActionType.SET_NOTE,
          payload: { ...data, view: true },
        })
        dispatch({
          type: ActionType.ACTION_SUCCESS,
          payload: SAVED_SUCCESS_MESSAGE,
        })
      }
    } catch (error) {
      dispatch({ type: ActionType.ACTION_FAIL, payload: UNEXPECTED_ERROR })
    }
  }

export const deleteNoteAction =
  (noteId: number) => async (dispatch: Dispatch<Action>) => {
    try {
      const response = await api.deleteNote(noteId)
      const { error } = response
      if (error) {
        dispatch({ type: ActionType.ACTION_FAIL, payload: error })
      } else {
        dispatch({
          type: ActionType.DELETE_NOTE,
          payload: noteId,
        })
        dispatch({
          type: ActionType.SET_NOTE,
          payload: {
            title: '',
            date: '',
            content: '',
            view: false,
            folderId: 0,
            favorite: false,
            archived: false,
          },
        })
      }
    } catch (error) {
      dispatch({ type: ActionType.ACTION_FAIL, payload: UNEXPECTED_ERROR })
    }
  }

export const setNoteAction =
  (note: NoteView) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.SET_NOTE, payload: note })
  }

export const clearMessage = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.CLEAR_MESSAGE, payload: '' })
}

export const setActionError =
  (objectError: { title: string; date: string }) =>
  async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.ACTION_FAIL, payload: objectError })
  }

export const moveToFolderAction =
  (fromId: number, toId: number) => async (dispatch: Dispatch<Action>) => {
    try {
      const response = await api.moveNoteToFolder(fromId, toId)
      const { error, data } = response
      if (error || !data) {
        dispatch({ type: ActionType.ACTION_FAIL, payload: error })
      } else {
        dispatch({
          type: ActionType.MOVE_TO_FOLDER,
          payload: { fromId, toId },
        })
      }
    } catch (error) {
      dispatch({ type: ActionType.ACTION_FAIL, payload: UNEXPECTED_ERROR })
    }
  }
