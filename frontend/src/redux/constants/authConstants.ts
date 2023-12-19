import { UserData, UserForm } from 'types/types'

export enum ActionType {
  SET_USER_DATA = 'SET_USER_DATA',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  SIGNUP_FAIL = 'SIGNUP_FAIL',
  SIGNIN_SUCCESS = 'SIGNIN_SUCCESS',
  SIGNIN_FAIL = 'SIGNIN_FAIL',
  SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN',
  CLEAR_MESSAGE = 'CLEAR_MESSAGE',
  LOGOUT = 'LOGOUT',
  GET_SESSION = 'GET_SESSION',
}

export const SIGNUP_SUCCESS_MESSAGE =
  'You have successfully created an account. Please sign in.'
export const SIGNIN_SUCCESS_MESSAGE =
  'Welcome to Nowted, note whatever you want.'
export const UNEXPECTED_ERROR = {
  username: 'Something went wrong.',
  email: 'Something went wrong.',
  password: 'Something went wrong.',
}

interface SetUserData {
  type: ActionType.SET_USER_DATA
  payload: UserData | null
}

interface SignUpSuccess {
  type: ActionType.SIGNUP_SUCCESS
  payload: string
}

interface SignUpFail {
  type: ActionType.SIGNUP_FAIL
  payload: UserForm
}

interface SignInSuccess {
  type: ActionType.SIGNIN_SUCCESS
  payload: {
    user: UserData
    accessToken: string
    successMessage: string
  }
}

interface SignInFail {
  type: ActionType.SIGNIN_FAIL
  payload: UserForm
}

interface SetAccessToken {
  type: ActionType.SET_ACCESS_TOKEN
  payload: string
}

interface Logout {
  type: ActionType.LOGOUT
  payload: null
}

interface ClearMessage {
  type: ActionType.CLEAR_MESSAGE
  payload: null
}

interface GetSession {
  type: ActionType.GET_SESSION
  payload: string
}

export type Action =
  | SetUserData
  | SignUpSuccess
  | SignUpFail
  | SignInSuccess
  | SignInFail
  | SetAccessToken
  | Logout
  | ClearMessage
  | GetSession
