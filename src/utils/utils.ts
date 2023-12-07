import * as palette from '../assets/Variables'
import { Session } from '../types/types'

export const handleInputAuth = (
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
    if (element.validity.typeMismatch)
      element?.parentElement?.setAttribute('data-errmsg', 'Email not valid')
    inValidStyleInputAuth(element)
  } else {
    validStyleInputAuth(element)
  }
}

const inValidStyleInputAuth = (element: HTMLInputElement) => {
  element?.style.setProperty('border-color', palette.RED)
  element?.style.setProperty('--placeholderColor', palette.RED)
  element?.style.setProperty('color', palette.RED)
  element?.parentElement?.style.setProperty('--opacityErr', '1')
}

const validStyleInputAuth = (element: HTMLInputElement) => {
  element?.parentElement?.setAttribute('data-errmsg', '')
  element?.style.setProperty('border-color', palette.WHITE)
  element?.style.setProperty('--placeholderColor', palette.WHITE)
  element?.style.setProperty('color', palette.WHITE)
  element?.parentElement?.style.setProperty('--opacityErr', '0')
}

export const setErrorInputAuth = (
  message: string,
  element: HTMLInputElement
) => {
  inValidStyleInputAuth(element)
  element?.parentElement?.setAttribute('data-errmsg', message)
}

interface SessionWithId extends Session {
  id: string
}

export const getLocalSession = (): SessionWithId => {
  const session = JSON.parse(
    window.localStorage.getItem('loggedUser') as string
  )
  return session
}

export const preventPressNumber = (e: React.KeyboardEvent) => {
  if (
    isNaN(Number(e.key)) &&
    e.key !== 'Backspace' &&
    e.key !== 'ArrowLeft' &&
    e.key !== 'ArrowRight'
  ) {
    e.preventDefault()
    return false
  }
}

export const handleInputDate = (
  e: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<string>>,
  condition: number
) => {
  let value = e.target.value
  const parentElement = e.target.parentElement
  const nextInput = e.target.nextSibling?.nextSibling as HTMLInputElement

  if (value.length >= e.target.maxLength) {
    if (e.target.id !== 'year') nextInput.focus()
    value = value.slice(0, e.target.maxLength)
  }

  if (value.length === e.target.maxLength) {
    if (Number(value) > condition || Number(value) === 0) {
      parentElement?.style.setProperty('--opacityErrNote', '1')
    } else {
      parentElement?.style.setProperty('--opacityErrNote', '0')
    }
  }
  setState(value)
}
