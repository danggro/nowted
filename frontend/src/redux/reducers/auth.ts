import { Reducer, Action as ActionRedux } from 'redux'
import { Action, ActionType } from 'redux/constants/authConstants'
import { UserData, UserForm } from 'types/types'

export interface AuthState {
  userData: UserData | null
  accessToken: string
  authError: UserForm
  successMessage: string
}

const initialState: AuthState = {
  userData: {} as UserData,
  accessToken: '',
  authError: {
    username: '',
    email: '',
    password: '',
  },
  successMessage: '',
}

const authReducer: Reducer<AuthState, ActionRedux> = (
  state: AuthState = initialState,
  action: ActionRedux
) => {
  const { type, payload } = action as Action
  switch (type) {
    case ActionType.SET_USER_DATA:
      return {
        ...state,
        userData: payload ? payload : state.userData,
      }
    case ActionType.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload ? payload : '',
      }
    case ActionType.SIGNUP_SUCCESS:
      return {
        ...state,
        authError: { username: '', email: '', password: '' },
        successMessage: payload ? payload : '',
      }
    case ActionType.SIGNIN_SUCCESS:
      return {
        ...state,
        userData: payload ? payload.user : state.userData,
        accessToken: payload ? payload.accessToken : '',
        authError: { username: '', email: '', password: '' },
        successMessage: payload ? payload.successMessage : '',
      }
    case ActionType.AUTH_FAIL:
      return {
        ...state,
        authError: {
          username: payload.username,
          email: payload.email,
          password: payload.password,
        },
        successMessage: '',
      }

    case ActionType.LOGOUT:
      return {
        ...state,
        userData: state.userData,
        accessToken: '',
        authError: { username: '', email: '', password: '' },
        successMessage: '',
      }

    case ActionType.CLEAR_MESSAGE:
      return {
        ...state,
        authError: payload,
        successMessage: '',
      }

    case ActionType.GET_SESSION:
      return {
        ...state,
        accessToken: payload ? payload : '',
      }
    default:
      return state
  }
}

export default authReducer
