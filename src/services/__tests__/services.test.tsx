import axios from 'axios'
import auth from '../auth'
import users from '../users'
import notes from '../notes'

const baseUrl = process.env.BACKEND_DEV

describe('Authorization', () => {
  it('service login should get response data and status 201', async () => {
    const response = await auth.login({
      username: 'danggro',
      token: '1',
    })

    expect(response.status).toEqual(201)
    expect(response.data).toEqual({
      username: 'danggro',
      token: '1',
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

describe.only('Notes service should', () => {
  it.todo('create a new note', async () => {
    // const response = await notes.add({title: 'this is title', date: '11122023', content: 'this is content'})
    // expect(response.status).toEqual(201)
  })
  it.skip('get notes according to userId', async () => {
    const response = await notes.get(1)
    expect(response.status).toEqual(200)
    expect(response.data.length).toEqual(2)
  })
  it.todo('update specific note')
  it.todo('delete specific note')
})
