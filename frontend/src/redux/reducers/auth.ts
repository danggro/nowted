import { Reducer, Action as ActionRedux } from 'redux'
import { Action, ActionType } from 'redux/constants/authConstants'
import { Response, UserData } from 'types/types'

export interface AuthState {
  userData: UserData | null
  accessToken: string
  signInError: string
  signUpError: string
  successMessage: string
}

const initialState: AuthState = {
  userData: {} as UserData,
  accessToken: '',
  signInError: '',
  signUpError: '',
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
        signInError: '',
        signUpError: '',
        successMessage: payload ? payload : '',
      }

    case ActionType.SIGNUP_FAIL:
      return {
        ...state,
        signInError: '',
        signUpError: payload ? payload : '',
        successMessage: '',
      }

    case ActionType.SIGNIN_SUCCESS:
      return {
        ...state,
        userData: payload ? payload.user : state.userData,
        accessToken: payload ? payload.accessToken : '',
        signInError: '',
        signUpError: '',
        successMessage: payload ? payload.successMessage : '',
      }

    case ActionType.SIGNIN_FAIL:
      return {
        ...state,
        signInError: payload ? payload : '',
        signUpError: '',
        successMessage: '',
      }

    case ActionType.LOGOUT:
      return {
        ...state,
        userData: state.userData,
        accessToken: '',
        signInError: '',
        signUpError: '',
        successMessage: '',
      }

    case ActionType.CLEAR_MESSAGE:
      return {
        ...state,
        signInError: '',
        signUpError: '',
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
