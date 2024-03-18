import { Dispatch } from 'react'
import { Action, ActionType } from 'redux/constants/folderConstants'
import { Folder, FolderForm } from 'types/types'
import * as api from 'redux/api/folderAPI'

export const setInitialFolderAction =
  () => async (dispatch: Dispatch<Action>) => {
    try {
      const response = await api.getFolder()
      const { error, data } = response
      if (error || !data) {
        console.log(error)
      } else {
        dispatch({
          type: ActionType.GET_FOLDER,
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
  (folder: Folder) => async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SELECT_FOLDER,
      payload: { ...folder, active: true },
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
