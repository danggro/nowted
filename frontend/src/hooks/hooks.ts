import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { CredentialsLogin, User, UserForm } from 'types/types'
import users from 'services/users'
import auth from 'services/auth'
import { getLocalSession } from 'utils/utils'

export default function useComponentVisible(initial: boolean) {
  const [open, setOpen] = useState<boolean>(initial)
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

export const useUser = () => {
  const navigate = useNavigate()

  const add = async (user: UserForm) => {
    const getUsers = await users.getAll()
    const checkUsername = getUsers.data.find(
      (u) => u.username === user.username
    )
    const checkEmail = getUsers.data.find((u) => u.email === user.email)
    if (!user.username) throw new Error('Username is missing')
    if (!user.email) throw new Error('Email is missing')
    if (!user.password) throw new Error('Password is missing')
    if (user.password.length < 8) throw new Error('Minimum 8 character')
    if (checkUsername) throw new Error('User not available')
    if (checkEmail) throw new Error('Email not available')

    await users.add(user)
  }

  const login = async (credentials: CredentialsLogin) => {
    const getUsers = await users.getAll()
    const user = getUsers.data.find(
      (u) => u.username === credentials.username
    ) as User
    if (!credentials.username) throw new Error('Username is missing')
    if (!credentials.password) throw new Error('Password is missing')

    if (!user) throw new Error('User not found')

    const { data } = await auth.login({
      username: user.username,
      password: credentials.password,
    })
    window.localStorage.setItem(
      'loggedUser',
      JSON.stringify({
        username: data.username,
        token: data.token,
        userId: data.userId,
      })
    )
    navigate('/')
  }

  const logout = async () => {
    const sessionLocal = getLocalSession()
    if (sessionLocal) {
      await auth.logout()
      window.localStorage.clear
      navigate('/login')
    }
  }

  return { add, login, logout }
}
