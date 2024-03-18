import { Folder } from 'types/types'

export enum ActionType {
  ADD_FOLDER = 'ADD_FOLDER',
  GET_FOLDER = 'GET_FOLDER',
}

interface AddFolder {
  type: ActionType.ADD_FOLDER
  payload: Folder
}

interface GetFolder {
  type: ActionType.GET_FOLDER
  payload: Folder[]
}

export type Action = AddFolder | GetFolder
