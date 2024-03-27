import { Dispatch } from 'react'
import { Action, ActionType } from 'redux/constants/folderConstants'
import { FolderForm } from 'types/types'
import * as api from 'redux/api/folderAPI'

export const getFoldersAction = () => async (dispatch: Dispatch<Action>) => {
  try {
    const response = await api.getFolder()
    const { error, data } = response
    if (error || !data) {
      console.log(error)
    } else {
      dispatch({
        type: ActionType.GET_FOLDERS,
        payload: data,
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const addFolderAction =
  (folder: FolderForm) => async (dispatch: Dispatch<Action>) => {
    try {
      const response = await api.addFolder(folder)
      const { error, data } = response
      if (error || !data) {
        console.log(error)
      } else {
        dispatch({
          type: ActionType.ADD_FOLDER,
          payload: data,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

export const selectFolderAction =
  (folderId: number) => async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SELECT_FOLDER,
      payload: folderId,
    })
  }

export const deleteFolderAction =
  (folderId: number) => async (dispatch: Dispatch<Action>) => {
    try {
      const response = await api.deleteFolder(folderId)
      const { error } = response
      if (error) {
        console.log(error)
      } else {
        dispatch({
          type: ActionType.DELETE_FOLDER,
          payload: folderId,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

export const selectMoreAction =
  (more: { favorite: boolean; archived: boolean }) =>
  async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SELECT_MORE,
      payload: more,
    })
  }

export const setActiveAction =
  (active: boolean) => async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_ACTIVE,
      payload: active,
    })
  }
