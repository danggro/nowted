import axios, { AxiosResponse } from 'axios'
import auth from '../auth'
import users from '../users'
import notes from '../notes'
import { baseUrl } from '../../utils/contants'
import { Note } from '../../types/types'

describe('Authorization', () => {
  it('service login should get response data and status 201', async () => {
    const response = await auth.login({
      username: 'danggro',
      token: 1,
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
  let responseAdd: AxiosResponse<Note, any>

  it('create a new note', async () => {
    responseAdd = await notes.add({
      title: 'this is title',
      date: '11122023',
      content: 'this is content',
      userId: 3,
    })
    expect(responseAdd.status).toEqual(201)
  })

  it('get notes according to userId', async () => {
    const response = await notes.get(responseAdd.data.userId)
    expect(response.status).toEqual(200)
    expect(response.data.length).toEqual(1)
    expect(response.data[0].title).toEqual('this is title')
  })
  // it.todo('get specific note accordint to id', )
  it.todo('update specific note')
  it.todo('delete specific note')
})
