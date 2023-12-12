import supertest from 'supertest'
import app from '../app'
import { Note, NoteForm, Session, User, UserForm, UserLogin } from '../types'
const api = supertest(app)

export const newUser = {
  username: 'digran',
  email: 'digran@gmail.com',
  password: 'secret123',
}

export const userLogin = {
  username: newUser.username,
  password: newUser.password,
}

export const newNoteObject = {
  title: 'This is title',
  date: '12/12/2023',
  content: 'This is content',
}

interface Response {
  id: number
  username: string
  email: string
}

const addUser = async (objectUser: UserForm = newUser): Promise<Response> => {
  const user = await api
    .post('/api/users')
    .send(objectUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  return user.body
}

const getAllUsers = async (): Promise<User[]> => {
  const user = await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  return user.body
}

const getUser = async (id: number): Promise<User> => {
  const user = await api
    .get(`/api/users/${id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  return user.body
}

const login = async (credentials: UserLogin = userLogin): Promise<Session> => {
  const login = await api
    .post('/api/auth/login')
    .send(credentials)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  return login.body
}

const addNote = async (
  token: string,
  noteObject: NoteForm = newNoteObject
): Promise<Note> => {
  const { body } = await api
    .post('/api/notes')
    .send(noteObject)
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  return body
}

const getNotes = async (token: string): Promise<Note[]> => {
  const notes = await api
    .get(`/api/notes/`)
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  return notes.body
}

const updateNotes = async (
  token: string,
  updateNote: NoteForm,
  noteId: number
): Promise<Note> => {
  const updatedNote = await api
    .put(`/api/notes/${noteId}`)
    .set('Authorization', `Bearer ${token}`)
    .send(updateNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  return updatedNote.body
}

export { addUser, getAllUsers, getUser, login, addNote, getNotes, updateNotes }
