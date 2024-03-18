import { Action, ActionType } from 'redux/constants/folderConstants'
import { Folder } from 'types/types'
import { Reducer, Action as ActionRedux } from 'redux'

export interface FolderView extends Folder {
  active: boolean
}

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
    default:
      return state
  }
}

export default folderReducer
