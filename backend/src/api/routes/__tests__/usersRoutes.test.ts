import supertest from 'supertest'
import app from '../../../app'
import { User } from '../../models'
import { addUser, getAllUsers, getUser } from '../../../utils/test-helper'

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
    const resultUser = await addUser()

    const getUser = await getAllUsers()
    expect(getUser).toHaveLength(1)
    expect(resultUser).toEqual({
      username: getUser[0].username,
      email: getUser[0].email,
      id: getUser[0].id,
    })
  })

  it('route get method returned as json and any data if it there', async () => {
    await addUser()
    const users = await getAllUsers()
    expect(users.length).toBeGreaterThanOrEqual(0)
  })

  it('route get method with id params returned data', async () => {
    const user = await addUser()
    const users = await getUser(user.id)
    expect(users.username).toEqual(user.username)
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
