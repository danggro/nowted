import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { CredentialsLogin, UserForm } from 'types/types'
import users from 'services/users'
import auth from 'services/auth'
import { getLocalSession } from 'utils/utils'

export default function useComponentVisible(initial: Boolean) {
  const [open, setOpen] = useState<Boolean>(initial)
  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener(
      'mousedown',
      (event: MouseEvent) => handleClickOutside(event),
      true
    )
    return () => {
      document.removeEventListener('mousedown', () => handleClickOutside, true)
    }
  }, [open])

  return { ref, open, setOpen }
}

export const useUtil = () => {
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
