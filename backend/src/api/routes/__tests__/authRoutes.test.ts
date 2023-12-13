import supertest from 'supertest'
import app from '../../../app'
import { clientRedis } from '../../../config/redis'
import { addUser, getUser, login } from '../../../utils/test-helper'
import { getSession } from '../../../utils/utils'
import { Note, User } from '../../../db/models'

const api = supertest(app)

describe('Auth', () => {
  beforeEach(async () => {
    await Note.destroy({ where: {} })
    await User.destroy({ where: {} })
    await addUser()
    await clientRedis.connect()
  })
  afterEach(async () => {
    await clientRedis.quit()
  })

  it('success login with valid credentials', async () => {
    const resLogin = await login()
    const user = await getUser(resLogin.userId)
    const session = await getSession(resLogin.token)
    expect(resLogin).toEqual({
      token: session.token,
      userId: user.id,
      username: user.username,
    })
  })

  describe('should error if input', () => {
    it('username missing', async () => {
      await api
        .post('/api/auth/login')
        .send({ username: '', password: 'secret123' })
        .expect(404)
    })
    it('password missing', async () => {
      await api
        .post('/api/auth/login')
        .send({ username: 'digran', password: '' })
        .expect(404)
    })
  })

  it('success logout', async () => {
    const resLogin = await login()
    await api
      .delete('/api/auth/logout')
      .set('Authorization', `Bearer ${resLogin.token}`)
      .expect(200)
  })
})
