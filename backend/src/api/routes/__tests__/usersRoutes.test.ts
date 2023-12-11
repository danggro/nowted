import supertest from 'supertest'
import app from '../../../app'
import { User } from '../../models'
import { addUser } from '../../../utils/test-helper'

const api = supertest(app)
const newUser = {
  username: 'digran',
  email: 'digran@gmail.com',
  password: 'secret123',
}

describe('User', () => {
  beforeEach(async () => {
    await User.destroy({ where: {} })
  })
  it('should be saved if input valid', async () => {
    const resultUser = await addUser(newUser)

    const getUser = await api.get('/api/users')
    expect(getUser.body).toHaveLength(1)
    expect(resultUser.body).toEqual({
      username: getUser.body[0].username,
      email: getUser.body[0].email,
    })
  })

  it('route get method returned as json and any data if it there', async () => {
    await addUser(newUser)
    const users = await api.get('/api/users').expect(200)
    expect(users.body.length).toBeGreaterThanOrEqual(0)
  })

  describe('should error if input', () => {
    it('username missing', async () => {
      await api
        .post('/api/users')
        .send({
          username: '',
          email: newUser.email,
          password: newUser.password,
        })
        .expect(400)
    })
    it('email missing', async () => {
      await api
        .post('/api/users')
        .send({
          username: newUser.username,
          email: '',
          password: newUser.password,
        })
        .expect(400)
    })
    it('password missing', async () => {
      await api
        .post('/api/users')
        .send({
          username: newUser.username,
          email: newUser.email,
          password: '',
        })
        .expect(400)
    })
  })
})
