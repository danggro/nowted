import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit'
import userReducer from './userReducer'

const reducer = {
  user: userReducer,
}
export const store = configureStore({
  reducer,
})

const rootReducer = combineReducers({
  ...reducer,
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
