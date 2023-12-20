import { useState } from 'react'
import { setAuthFail } from 'redux/actions/authActions'
import { useAppDispatch } from 'redux/store'
import * as palette from 'assets/Variables'

enum InputForm {
  USERNAME = 'username',
  EMAIL = 'username',
  PASSWORD = 'username',
}

const authError = {
  username: '',
  email: '',
  password: '',
}

const useInputAuth = () => {
  const [state, setState] = useState<string>('')
  const dispatch = useAppDispatch()

  const setStateFunction = (event: React.FormEvent<HTMLInputElement>) => {
    const element = event.currentTarget

    setState(element.value)

    if (element.id === 'username') {
      if (!element.value) {
        return invalidTemplate(element, 'Please fill this input form')
      }
      validTemplate(element)
    }

    if (element.id === 'email') {
      if (!element.value) {
        return invalidTemplate(element, 'Please fill this input form')
      }
      if (element.validity.typeMismatch) {
        return invalidTemplate(element, 'Email format not valid')
      }
      validTemplate(element)
    }

    if (element.id === 'password') {
      if (!element.value) {
        return invalidTemplate(element, 'Please fill this input form')
      }
      if (element.validity.tooShort) {
        return invalidTemplate(element, 'Minimum 8 character')
      }
      validTemplate(element)
    }
  }

  const invalidTemplate = (
    element: EventTarget & HTMLInputElement,
    message: string
  ) => {
    authError[element.id as InputForm] = message
    dispatch(setAuthFail(authError))
    return inValidStyleInputAuth(element)
  }

  const validTemplate = (element: EventTarget & HTMLInputElement) => {
    authError[element.id as InputForm] = ''
    dispatch(setAuthFail(authError))
    return validStyleInputAuth(element)
  }

  const inValidStyleInputAuth = (element: HTMLInputElement) => {
    element?.style.setProperty('border-color', palette.RED)
    element?.style.setProperty('--placeholderColor', palette.RED)
    element?.style.setProperty('color', palette.RED)
  }

  const validStyleInputAuth = (element: HTMLInputElement) => {
    element?.parentElement?.setAttribute('data-errmsg', '')
    element?.style.setProperty('border-color', palette.WHITE)
    element?.style.setProperty('--placeholderColor', palette.WHITE)
    element?.style.setProperty('color', palette.WHITE)
  }
  return [state, setStateFunction] as const
}

export default useInputAuth
