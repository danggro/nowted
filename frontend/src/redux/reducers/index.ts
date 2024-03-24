import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth'
import noteReducer from './note'
import folderReducer from './folder'

const rootReducer = combineReducers({
  auth: authReducer,
  note: noteReducer,
  folder: folderReducer,
})
export default rootReducer
