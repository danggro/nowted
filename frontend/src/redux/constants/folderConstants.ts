import { Folder, FolderView } from 'types/types'

export enum ActionType {
  ADD_FOLDER = 'ADD_FOLDER',
  GET_FOLDER = 'GET_FOLDER',
  SELECT_FOLDER = 'SELECT_FOLDER',
  DELETE_FOLDER = 'DELETE_FOLDER',
}

interface AddFolder {
  type: ActionType.ADD_FOLDER
  payload: Folder
}

interface GetFolder {
  type: ActionType.GET_FOLDER
  payload: Folder[]
}

interface SelectFolder {
  type: ActionType.SELECT_FOLDER
  payload: FolderView
}

interface DeleteFolder {
  type: ActionType.DELETE_FOLDER
  payload: number
}

export type Action = AddFolder | GetFolder | SelectFolder | DeleteFolder
