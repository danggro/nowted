import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../reducers/store'
import { Note, NoteForm, UserForm } from '../types/types'
import users from '../services/users'
import { useReducer, useState } from 'react'
import notesService from '../services/notes'
import { reducer } from '../context/NoteContext'
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
