import { Dispatch } from 'redux'
import {
  Action,
  ActionType,
  ERROR_MESSAGE,
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
      dispatch({ type: ActionType.ACTION_FAIL, payload: ERROR_MESSAGE })
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
      dispatch({ type: ActionType.ACTION_FAIL, payload: ERROR_MESSAGE })
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
      dispatch({ type: ActionType.ACTION_FAIL, payload: ERROR_MESSAGE })
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
          payload: { title: '', date: '', content: '', view: false },
        })
      }
    } catch (error) {
      dispatch({ type: ActionType.ACTION_FAIL, payload: ERROR_MESSAGE })
    }
  }

export const setNoteAction =
  (note: NoteView) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.SET_NOTE, payload: note })
  }

export const clearMessageAction = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.CLEAR_MESSAGE, payload: '' })
}
