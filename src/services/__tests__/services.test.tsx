import axios from 'axios'
import auth from '../auth'
import users from '../users'

const baseUrl = process.env.BACKEND_API

describe('Authorization', () => {
  it('service login should get response data and status 201', async () => {
    const response = await auth.login({
      username: 'danggro',
      password: 'secret',
    })

    expect(response.status).toEqual(201)
    expect(response.data).toEqual({
      username: 'danggro',
      password: 'secret',
      id: 1,
    })
  })

  it('service logout should get response status 204 and the session removed', async () => {
    const getUserSession = await axios.get(`${baseUrl}/login/1`)
    const response = await auth.logout(getUserSession.data)

    expect(response.status).toEqual(200)
  })
})

describe('User', () => {
  it('service should get all username detail', async () => {
    const response = await users.getAll()

    expect(response.data.length).toBeGreaterThanOrEqual(0)
    expect(response.status).toEqual(200)
  })
  it.todo('service should get specific username detail')
  it.todo('service should add username from signup page')
})
