import * as palette from '../assets/Variables'
import { Session } from '../types/types'

export const handleChange = (
  e: React.FormEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<string>>
) => {
  const element = e.currentTarget
  setState(element.value)

  if (!element.checkValidity()) {
    if (element.validity.tooShort)
      element?.parentElement?.setAttribute('data-errmsg', 'Minimum 8 character')
    if (element.validity.valueMissing)
      element?.parentElement?.setAttribute(
        'data-errmsg',
        'Please fill this input form'
      )
    inValidStyle(element)
  } else {
    validStyle(element)
  }
}

const inValidStyle = (element: HTMLInputElement) => {
  element?.style.setProperty('border-color', palette.RED)
  element?.style.setProperty('--placeholderColor', palette.RED)
  element?.style.setProperty('color', palette.RED)
  element?.parentElement?.style.setProperty('--opacityErr', '1')
}

const validStyle = (element: HTMLInputElement) => {
  element?.parentElement?.setAttribute('data-errmsg', '')
  element?.style.setProperty('border-color', palette.WHITE)
  element?.style.setProperty('--placeholderColor', palette.WHITE)
  element?.style.setProperty('color', palette.WHITE)
  element?.parentElement?.style.setProperty('--opacityErr', '0')
}

export const setErrorInput = (message: string, element: HTMLInputElement) => {
  inValidStyle(element)
  element?.parentElement?.setAttribute('data-errmsg', message)
}

export const getLocalSession = (): Session | null => {
  const session = window.localStorage.getItem('loggedUser')
  if (session) {
    return JSON.parse(session)
  }
  return null
}
