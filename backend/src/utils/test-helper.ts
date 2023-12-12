import supertest from 'supertest'
import app from '../app'
import { Session, User, UserForm, UserLogin } from '../types'
const api = supertest(app)

const newUser = {
  username: 'digran',
  email: 'digran@gmail.com',
  password: 'secret123',
}

const userLogin = {
  username: newUser.username,
  password: newUser.password,
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
  const user = await api.get('/api/users').expect(200)

  return user.body
}

const getUser = async (id: number): Promise<User> => {
  const user = await api.get(`/api/users/${id}`).expect(200)
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

export { addUser, getAllUsers, getUser, login }
