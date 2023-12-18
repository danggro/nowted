import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import authReducer from './reducers/auth'
import noteReducer from './reducers/note'

const createAppStore = () => {
  try {
    const store = configureStore({
      reducer: rootReducer,
    })
    return store
  } catch (err) {
    throw new Error('Some error occurred')
  }
}

const store = createAppStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default createAppStore
