import { Action, ActionType } from 'redux/constants/folderConstants'
import { Folder, FolderView } from 'types/types'
import { Reducer, Action as ActionRedux } from 'redux'

export interface FolderState {
  folders: Folder[]
  folder: FolderView
}

const initialState: FolderState = {
  folders: [],
  folder: {
    id: 0,
    userId: 0,
    name: '',
    active: false,
  },
}

const folderReducer: Reducer<FolderState, ActionRedux> = (
  state: FolderState = initialState,
  action: ActionRedux
): FolderState => {
  const { type, payload } = action as Action
  switch (type) {
    case ActionType.GET_FOLDERS:
      return {
        ...state,
        folders: payload ? payload : state.folders,
      }
    case ActionType.ADD_FOLDER:
      const folderAdded = state.folders.concat(payload)
      return {
        ...state,
        folders: payload ? folderAdded : state.folders,
      }
    case ActionType.SELECT_FOLDER:
      const selectedFolder = state.folders.filter(
        (folder) => folder.id === payload
      )
      return {
        ...state,
        folder: payload ? { ...selectedFolder[0], active: true } : state.folder,
      }
    case ActionType.DELETE_FOLDER:
      const folderDeleted = state.folders.filter((folder) => {
        return folder.id !== payload
      })
      return {
        ...state,
        folders: payload ? folderDeleted : state.folders,
        folder: payload ? { ...folderDeleted[0], active: false } : state.folder,
      }
    default:
      return state
  }
}

export default folderReducer
