import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth'
import noteReducer from './note'

const rootReducer = combineReducers({
  auth: authReducer,
  note: noteReducer,
})
export default rootReducer
