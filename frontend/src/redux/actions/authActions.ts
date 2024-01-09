import {
  Action,
  ActionType,
  SIGNIN_SUCCESS_MESSAGE,
  SIGNUP_SUCCESS_MESSAGE,
  UNEXPECTED_ERROR,
} from 'redux/constants/authConstants'
import { UserForm, UserData, CredentialsLogin, Session } from 'types/types'
import { Dispatch } from 'redux'
import { NavigateFunction } from 'react-router'
import * as api from 'redux/api/authAPI'
import { AppDispatch } from 'redux/store'

export const initializeAuth =
  (navigate: NavigateFunction) => async (dispatch: AppDispatch) => {
    const storageLocal = localStorage.getItem('loggedUser')
    if (!storageLocal) {
      dispatch(setAccessToken(''))
      dispatch(setUserData(null))
      navigate('/login')
      return
    }

    const storageParsed: Session = JSON.parse(storageLocal)
    const { data } = await api.getSession(storageParsed.accessToken)

    if (data) {
      const userData = {
        username: storageParsed.username,
        id: storageParsed.userId,
      }
      dispatch(setAccessToken(data))
      dispatch(setUserData(userData))
    } else {
      dispatch(setAccessToken(''))
      dispatch(setUserData(null))
      navigate('/login')
      localStorage.removeItem('loggedUser')
    }
  }

export const setUserData =
  (userData: UserData | null) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.SET_USER_DATA, payload: userData })
  }

export const setAccessToken =
  (accessToken: string) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.SET_ACCESS_TOKEN, payload: accessToken })
  }

export const setAuthFail =
  (objectError: UserForm) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.AUTH_FAIL, payload: objectError })
  }

export const clearMessage = () => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.CLEAR_MESSAGE,
    payload: { username: '', email: '', password: '' },
  })
}

export const logoutAction =
  (accessToken: string, navigate: NavigateFunction) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      await api.logout(accessToken)
      localStorage.removeItem('loggedUser')
      dispatch({ type: ActionType.LOGOUT, payload: null })
      navigate('/login')
    } catch (error) {
      throw new Error('Error logout')
    }
  }

export const signUpAction =
  (formData: UserForm, navigate: NavigateFunction) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const response = await api.signUp(formData)
      const { error } = response
      if (error) {
        dispatch({ type: ActionType.AUTH_FAIL, payload: error })
      } else {
        if (formData.password.length < 8)
          return dispatch({
            type: ActionType.AUTH_FAIL,
            payload: { ...error, password: 'Minimum 8 character' },
          })
        dispatch({
          type: ActionType.SIGNUP_SUCCESS,
          payload: SIGNUP_SUCCESS_MESSAGE,
        })
        navigate('/login')
      }
    } catch (error) {
      dispatch({
        type: ActionType.AUTH_FAIL,
        payload: UNEXPECTED_ERROR,
      })
    }
  }

export const signInAction =
  (credential: CredentialsLogin, navigate: NavigateFunction) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const response = await api.signIn(credential)
      const { error, data } = response
      if (error || !data) {
        dispatch({ type: ActionType.AUTH_FAIL, payload: error })
      } else {
        const { username, userId, accessToken } = data
        const user = { username, id: userId }
        dispatch({
          type: ActionType.SIGNIN_SUCCESS,
          payload: {
            user,
            accessToken,
            successMessage: SIGNIN_SUCCESS_MESSAGE,
          },
        })

        localStorage.setItem(
          'loggedUser',
          JSON.stringify({ ...user, accessToken })
        )
        navigate('/')
      }
    } catch (error) {
      dispatch({
        type: ActionType.AUTH_FAIL,
        payload: UNEXPECTED_ERROR,
      })
    }
  }
