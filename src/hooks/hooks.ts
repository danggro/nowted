import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../reducers/store'
import { UserForm } from '../types/types'
import users from '../services/users'
import { useState, useEffect, useRef } from 'react'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useUser = () => {
  const addUser = async (user: UserForm) => {
    const getUsers = await users.getAll()
    const checkUsername = getUsers.data.find(
      (u) => u.username === user.username
    )
    const checkEmail = getUsers.data.find((u) => u.email === user.email)
    if (checkUsername) throw new Error('User not available')
    if (checkEmail) throw new Error('Email not available')

    await users.add(user)
  }
  return { addUser }
}

export default function useComponentVisible(initial: Boolean) {
  const [open, setOpen] = useState<Boolean>(initial)
  const ref = useRef<HTMLDivElement>(null)
  const current = ref.current as EventTarget | null
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
