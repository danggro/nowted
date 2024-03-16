import { Folder } from 'types/types'

export enum ActionType {
  ADD_FOLDER = 'ADD_FOLDER',
}

interface AddFolder {
  type: ActionType.ADD_FOLDER
  payload: Folder
}

export type Action = AddFolder
