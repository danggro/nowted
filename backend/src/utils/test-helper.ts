import supertest from 'supertest'
import app from '../app'
import { UserForm } from '../types/types'
const api = supertest(app)

const addUser = async (newUser: UserForm) => {
  const user = await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  return user
}

export { addUser }
