import axios, { AxiosResponse } from 'axios'
import auth from '../auth'
import users from '../users'
import notes from '../notes'
import { baseUrl } from 'utils/contants'
import { Note } from 'types/types'

describe('Authorization', () => {
  it('service login should get response data and status 201', async () => {
    const response = await auth.login({
      username: 'danggro',
      token: 1,
    })

    expect(response.status).toEqual(201)
    expect(response.data).toEqual({
      username: 'danggro',
      token: 1,
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
  it('service should add username from signup page', async () => {
    const responseAdd = await users.add({
      username: 'digran',
      email: 'digran@gmail.com',
      password: '12345678',
    })
    const responseGet = await users.getAll()

    expect(responseAdd.status).toEqual(201)
    expect(responseGet.data.length).toBeGreaterThanOrEqual(1)
  })
})

describe('Notes service should', () => {
  let responseAdd: AxiosResponse<Note, any>
  let responseGet: AxiosResponse<Note[], any>
  it('create a new note', async () => {
    const newNote = {
      title: 'this is title',
      date: '11122023',
      content: 'this is content',
      userId: 3,
    }
    responseAdd = await notes.add(newNote)
    expect(responseAdd.status).toEqual(201)
  })

  it('get notes according to userId', async () => {
    responseGet = await notes.get(responseAdd.data.userId as number)
    expect(responseGet.status).toEqual(200)
    expect(responseGet.data.length).toBeGreaterThanOrEqual(1)
    expect(responseGet.data[0].title).toEqual('this is title')
  })

  it('update specific note', async () => {
    const updatedNote = {
      id: 1,
      title: 'this is title updated',
      date: '11122023',
      content: 'this is content updated',
      userId: 3,
    }
    console.log(baseUrl)

    const response = await notes.update(updatedNote)
    const responseGet = await axios.get(`${baseUrl}/notes/${response.data.id}`)
    expect(response.status).toEqual(200)
    expect(responseGet.data.title).toEqual('this is title updated')
  })

  it('delete specific note', async () => {
    const response = await notes.deleteNote(1)
    const responseGetAll = await axios.get(`${baseUrl}/notes`)
    expect(response.status).toEqual(200)
    expect(responseGetAll.data.length).toEqual(0)
  })
})
