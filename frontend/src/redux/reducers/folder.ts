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
    case ActionType.GET_FOLDER:
      return {
        ...state,
        folders: payload ? payload : state.folders,
      }
    case ActionType.ADD_FOLDER:
      const noteAdded = state.folders.concat(payload)
      return {
        ...state,
        folders: payload ? noteAdded : state.folders,
      }
    case ActionType.SELECT_FOLDER:
      return {
        ...state,
        folder: payload.active ? payload : state.folder,
      }
    default:
      return state
  }
}

export default folderReducer
