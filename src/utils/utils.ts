import { useNavigate } from 'react-router'
import * as palette from '../assets/Variables'
import auth from '../services/auth'
import users from '../services/users'
import { CredentialsLogin, Session, UserForm } from '../types/types'

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
    if (element.validity.typeMismatch)
      element?.parentElement?.setAttribute('data-errmsg', 'Email not valid')
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

interface SessionWithId extends Session {
  id: string
}

export const getLocalSession = (): SessionWithId => {
  const session = JSON.parse(
    window.localStorage.getItem('loggedUser') as string
  )
  return session
}

export const userUtil = () => {
  const navigate = useNavigate()

  const add = async (user: UserForm) => {
    const getUsers = await users.getAll()
    const checkUsername = getUsers.data.find(
      (u) => u.username === user.username
    )
    const checkEmail = getUsers.data.find((u) => u.email === user.email)
    if (checkUsername) throw new Error('User not available')
    if (checkEmail) throw new Error('Email not available')

    await users.add(user)
  }

  const login = async (credentials: CredentialsLogin) => {
    const getUsers = await users.getAll()
    const user = getUsers.data.find((u) => u.username === credentials.username)
    if (!user) throw new Error('User not found')
    if (user.password !== credentials.password)
      throw new Error('Wrong password')

    const { data } = await auth.login({
      username: user.username,
      token: user.id,
    })
    window.localStorage.setItem(
      'loggedUser',
      JSON.stringify({ username: data.username, token: user.id, id: data.id })
    )
    navigate('/')
  }

  const logout = async () => {
    const sessionLocal = getLocalSession()
    if (sessionLocal) {
      await auth.logout(sessionLocal.id)
      window.localStorage.clear
      navigate('/login')
    }
  }

  return { add, login, logout }
}
