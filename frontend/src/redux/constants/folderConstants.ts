import { Folder } from 'types/types'

export enum ActionType {
  ADD_FOLDER = 'ADD_FOLDER',
  GET_FOLDERS = 'GET_FOLDERS',
  SELECT_FOLDER = 'SELECT_FOLDER',
  DELETE_FOLDER = 'DELETE_FOLDER',
  SELECT_MORE = 'SELECT_MORE',
  SET_ACTIVE = 'SET_ACTIVE',
}

interface AddFolder {
  type: ActionType.ADD_FOLDER
  payload: Folder
}

interface GetFolder {
  type: ActionType.GET_FOLDERS
  payload: Folder[]
}

interface SelectFolder {
  type: ActionType.SELECT_FOLDER
  payload: number
}

interface DeleteFolder {
  type: ActionType.DELETE_FOLDER
  payload: number
}

interface SelectMore {
  type: ActionType.SELECT_MORE
  payload: { favorite: boolean; archived: boolean }
}

interface SetActive {
  type: ActionType.SET_ACTIVE
  payload: boolean
}

export type Action =
  | AddFolder
  | GetFolder
  | SelectFolder
  | DeleteFolder
  | SelectMore
  | SetActive
