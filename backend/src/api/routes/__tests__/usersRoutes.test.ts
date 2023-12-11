import supertest from 'supertest'
import app from '../../../app'

const api = supertest(app)

describe('User', () => {
  it('should be saved if input valid', async () => {
    const newUser = {
      username: 'digran',
      email: 'digran@gmail.com',
      password: 'secret123',
    }

    const resultUser = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const getUser = await api.get('/api/users')
    expect(getUser.body).toHaveLength(1)
    expect(resultUser.body).toEqual({
      username: getUser.body[0].username,
      email: getUser.body[0].email,
    })
  })
  describe('should error if input', () => {
    it.todo('username missing')
    it.todo('email missing')
    it.todo('password missing')
  })
})
